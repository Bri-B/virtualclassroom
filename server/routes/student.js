/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const axios = require('axios');
const { Router } = require('express');
const { Op } = require('sequelize');

const {
  Announcement,
  Announcement_class,
  Assignment, Assignment_class,
  Assignment_student,
  Class,
  School,
  Student,
  Student_class,
  Teacher,
} = require('../db/models/index');

const studentRouter = Router();

// Twilio API ROUTE?
// make doc with guide to routes

// need to filter by school...
// route to get all students
// Route: teacher/
// Input: /
// Output: all students
studentRouter.get('/', (req, res) => {
  Student.findAll()
    .then((students) => {
      res.send(students);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// get student info by student primary key id
studentRouter.get('/ID/:studentID', (req, res) => {
  const { studentID } = req.params;
  Student.findByPk(studentID)
    .then((student) => {
      res.send(student);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// get student info by student email
studentRouter.get('/email/:studentEmail', (req, res) => {
  const { studentEmail } = req.params;
  Student.findAll({
    where: {
      email: studentEmail,
    },
  })
    .then((student) => {
      res.send(student);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// get student info by student name
studentRouter.get('/name/:studentName', (req, res) => {
  const { studentEmail } = req.params;
  Student.findAll({
    where: {
      email: studentEmail,
    },
  })
    .then((student) => {
      res.send(student);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// get school info by student primary key id
studentRouter.get('/school/:studentID', (req, res) => {
  const { studentID } = req.params;
  Student.findByPk(studentId)
    .then((student) => {
      School.findByPk(student.dataValues.id_school)
        .then((school) => {
          res.send(school);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});
// get all announcements for a class
studentRouter.get('/announcement/:classID', (req, res) => {
  const { classID } = req.params;
  Announcement_class.findAll({
    where: { id_class: classID },
  })
    .then((associations) => {
      const ids = [];
      associations.map((assObj) => ids.push(assObj.id_announcement));
      Announcement.findAll({
        where: {
          id: { [Op.or]: ids },
        },
      }).then((announcements) => {
        res.send(announcements);
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// create announcement (class id) => class id is an array of the
// classes you want to associate with this announcement

// get all assignments for a class
studentRouter.get('/assignment/:classID', (req, res) => {
  const { classID } = req.params;
  Assignment_class.findAll({
    where: { id_class: classID },
  })
    .then((associations) => {
      const ids = [];
      associations.map((assObj) => ids.push(assObj.id_assignment));
      Assignment.findAll({
        where: {
          id: { [Op.or]: ids },
        },
      }).then((assignments) => {
        res.send(assignments);
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// submit assignment
studentRouter.put('/submit/assignment', (req, res) => {
  const {
    id_assignment, id_student, drive_url,
  } = req.body;
  Assignment_student.update({
    drive_url,
  }, {
    where: {
      id_assignment, id_student,
    },
  })
    .then(() => {
      res.send('assignment submitted');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});
// get all classes by student id
studentRouter.get('/classes/:studentID', (req, res) => {
  const { studentID } = req.params;
  Class.findAll({
    where: {
      id_student: studentID,
    },
  })
    .then((classes) => {
      res.send(classes);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
module.exports = {
  studentRouter,
};
