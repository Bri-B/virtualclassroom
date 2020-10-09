/* eslint-disable no-console */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');
const { studentRouter } = require('./routes/student');
const { teacherRouter } = require('./routes/teacher');
const models = require('./db/models/index');
require('./auth/passport.setup');
const { isLoggedIn } = require('./auth/verifyLogIn');
require('dotenv').config();
const bodyParser = require('body-parser');
// Cookies and Session info
app.use(
  cookieSession({
    name: 'user',
    keys: [process.env.COOKIE_SESSION_KEY],
  }),
);

// middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routers
// const { teacherRouter } = require('./routes/student');
// const { studentRouter } = require('./routes/teacher');
const passportRouter = require('./auth/routes');

const PORT = process.env.SERVER_PORT || 8080;

const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded())
app.use(express.static(DIST_DIR));

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});

app.use('/teacher', teacherRouter);
// app.use('/student', studentRouter);
app.use('/auth/google', passportRouter);

app.get('/', (req, res) => {
  res.send('you are not logged in');
});

app.get('/account', isLoggedIn, (req, res) => {
  res.send('you are logged in');
});

app.get('/logout', (req, res) => {
  req.session = null; // destory the session
  req.logOut(); // logout from passport
  res.redirect('/'); // send them to where is needed
});

const connection = async () => {
  try {
    await models.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
const syncModels = async () => {
  try {
    await models.sequelize.sync();
    console.log('Models have been synced successfully.');
  } catch (error) {
    console.error('Unable to sync models:', error);
  }
};

connection();
syncModels();
app.listen(PORT, () => {
  console.log(`🌌Server has started on port: 🚀${PORT}`);
});
