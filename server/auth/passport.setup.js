// Import passport and Google OAuth 2.0
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const {
  Teacher, Student,
} = require('../db/models/index');

passport.serializeUser((user, done) => {
  // Setting userId obj on req.session
  done(null, user);
});

passport.deserializeUser((user, done) => {
  if (user.isTeacher) {
    Teacher.findByPk(user.id)
      .then((teacher) => {
        done(null, { user: 'teacher', ...teacher.dataValues });
      })
      .catch((err) => {
        console.error(err);
      });
  } else if (user.isStudent) {
    Student.findByPk(user.id)
      .then((student) => {
        done(null, { user: 'student', ...student.dataValues });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(err);
      });
  }
});

// defining how passport will use google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${process.env.SERVER_PORT}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      // accessToken, and refreshToken can be used for additional google products
      const data = {
        id: profile.id,
        fullName: profile.displayName,
        lastName: profile.name.familyName,
        firstName: profile.name.givenName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value,
      };
      // use the profile info (profile id) to check if the user is registered in the db
      Teacher.findAll({
        where: {
          email: data.email,
        },
      })
        .then((results) => {
          // if the user doesn't exists, save to db,
          // else selected the user and pass them to the done function
          // returns and empty arr if no teacher found
          // signal that this is done
          console.log('check user');
          if (results.length > 0) {
            console.log('teacher');
            const teacher = results[0].dataValues;
            return done(null, { id: teacher.id, isTeacher: true }); // credentials valid
          }
          Student.findAll({
            where: {
              email: data.email,
            },
          })
            .then((res) => {
              console.log('check user');
              if (res.length > 0) {
                console.log('student');
                const student = res[0].dataValues;
                return done(null, { id: student.id, isStudent: true }); // credentials valid
              }
              console.log('not user');
              return done(null, false); // unvalid credentials
            });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  ),
);
