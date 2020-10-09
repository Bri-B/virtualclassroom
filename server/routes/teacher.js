/* eslint-disable camelcase */
/* eslint-disable no-console */
const axios = require('axios');
const { Router } = require('express');

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
  // sequelize,
  // Sequelize,
} = require('../db/models/index');

const teacherRouter = Router();

// Twilio API ROUTE?
// make doc with guide to routes

// need to filter by school...
// route to get all teachers
// Route: teacher/
// Input: /
// Output: all teachers
teacherRouter.get('/', (req, res) => {
  Teacher.findAll()
    .then((teachers) => {
      res.send(teachers);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// get teacher info by teacher primary key id
teacherRouter.get('/ID/:teacherID', (req, res) => {
  const { teacherID } = req.params;
  Teacher.findByPk(teacherID)
    .then((teacher) => {
      console.log(teacher);
      res.send(teacher);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// get teacher info by teacher email
teacherRouter.get('/email/:teacherEmail', (req, res) => {
  const { teacherEmail } = req.params;
  Teacher.findAll({
    where: {
      email: teacherEmail,
    },
  })
    .then((teacher) => {
      console.log(teacher);
      res.send(teacher);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// get teacher info by teacher name
teacherRouter.get('/name/:teacherName', (req, res) => {
  // maybe need to redo teacher to be first and last name fields?
  const { teacherEmail } = req.params;
  Teacher.findAll({
    where: {
      email: teacherEmail,
    },
  })
    .then((teacher) => {
      console.log(teacher);
      res.send(teacher);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});
// add student to class
teacherRouter.put('/addStudentClass/:studentID/:classID', (req, res) => {
  const { studentID, classID } = req.params;
  Student_class.findOrCreate({
    where: {
      id_student: studentID,
      id_class: classID,
    },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});
// remove student from class
teacherRouter.delete('/deleteStudentClass/:studentID/:classID', (req, res) => {
  const { studentID, classID } = req.params;
  Student_class.destroy({
    where: {
      id_student: studentID,
      id_class: classID,
    },
  })
    .then((result) => {
      if (result) {
        res.send('student was removed from class');
        return;
      }
      res.status(404).send('student not in class');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err, 'there was an error processing request');
    });
});
// get school info by teacher primary key id
teacherRouter.get('/school/:teacherID', (req, res) => {
  const { teacherID } = req.params;
  Teacher.findByPk(teacherID)
    .then((teacher) => {
      School.findByPk(teacher.dataValues.id_school)
        .then((school) => {
          res.send(school);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});
// create announcement (class id)
teacherRouter.post('/create/announcement', (req, res) => {
  const {
    announcement_title, description, release_time, expiration_date, id_class,
  } = req.body;
  Announcement.findOrCreate({
    where: {
      announcement_title, description, release_time, expiration_date,
    },
  })
    .then((announcement) => {
      const { id } = announcement[0].dataValues;
      Announcement_class.findOrCreate({
        where: {
          id_announcement: id,
          id_class,
        },
      })
        .then(() => {
          res.send(announcement);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});
// get all classes by teacher id
teacherRouter.get('/classes/:teacherID', (req, res) => {
  const { teacherID } = req.params;
  Class.findAll({
    where: {
      id_teacher: teacherID,
    },
  })
    .then((classes) => {
      res.send(classes);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// add a class by teacher id
teacherRouter.post('/classes', (req, res) => {
  const {
    class_name, period, start_time, end_time, id_school, id_teacher,
  } = req.body;
  Class.findOrCreate({
    where: {
      class_name, period, start_time, end_time, id_school, id_teacher,
    },
  })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// update class info
teacherRouter.put('/classes/:classID', (req, res) => {
  const { classID } = req.params;
  const {
    class_name, period, start_time, end_time, id_school, id_teacher,
  } = req.body;
  Class.update({
    class_name, period, start_time, end_time, id_school, id_teacher,
  }, {
    where: {
      id: classID,
    },
  })
    .then(() => {
      res.send('class updated');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// delete a class
teacherRouter.delete('/classes/:classID', (req, res) => {
  const { classID } = req.params;
  Class.destroy({
    where: {
      id: classID,
    },
  })
    .then((removedClass) => {
      if (removedClass) {
        res.send('class was deleted');
        return;
      }
      res.status(404).send('class not found');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// create assignment
module.exports = {
  teacherRouter,
};
