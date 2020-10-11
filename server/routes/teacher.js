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
// get all announcements for a class
teacherRouter.get('/announcement/:classID', (req, res) => {
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
teacherRouter.post('/create/announcement', (req, res) => {
  const {
    announcement_title, description, release_time, expiration_date, id_class,
  } = req.body;
  Announcement.create({
    announcement_title, description, release_time, expiration_date,
  })
    .then((announcement) => {
      const { id } = announcement.dataValues;
      id_class.map((classid) => {
        console.log('map id_class', classid);
        console.log('announcement id', id);
        Announcement_class.findOrCreate({
          where: {
            id_announcement: id,
            id_class: classid,
          },
        });
      });
    })
    .then((announcement) => {
      res.send(announcement);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// edit announcement, id is announcement, id_class is array of classes to associate with
teacherRouter.put('/edit/announcement', (req, res) => {
  const {
    id, announcement_title, description, release_time, expiration_date, id_class,
  } = req.body;
  Announcement.update(
    {
      announcement_title, description, release_time, expiration_date,
    },
    {
      where: {
        id,
      },

    },
  )
    .then(() => {
      Announcement_class.destroy({
        where: {
          id_announcement: id,
        },
      });
    })
    .then(() => {
      id_class.map((classid) => {
        Announcement_class.create({
          id_announcement: id,
          id_class: classid,
        });
      });
    })
    .then(() => {
      res.send('done');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// delete announcement
teacherRouter.delete('/delete/announcement', (req, res) => {
  const { id } = req.body;
  Announcement.destroy({
    where: {
      id,
    },
  })
    .then(() => {
      Announcement_class.destroy({
        where: {
          id_announcement: id,
        },
      });
    }).then(() => {
      res.send('deleted');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});
// create assignment (send class id's as object? array?
teacherRouter.post('/create/assignment', (req, res) => {
  const {
    assignment_name, description, due_date, release_time, id_class,
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
