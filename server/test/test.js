/* eslint-disable camelcase */
/* eslint-disable no-console */
require('dotenv').config();

const {
  Announcement,
  Announcement_class,
  Assignment,
  Assignment_class,
  Assignment_student,
  Class, School,
  Student,
  Student_class,
  Teacher,
} = require('../db/models/index.js');

function primeDB() {
  School.findOrCreate({
    where: {
      school_name: 'Hannibal High School',
    },
  })
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ School Created');
      }
      return console.error('❌save undefined');
    })
    .then(() => Student.findOrCreate({
      where: {
        full_name: process.env.SEEDUSER,
        id_school: 1,
        email: process.env.SEEDEMAIL,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Student Created');
      }
      return console.error('❌save undefined');
    })
    .then(() => Teacher.findOrCreate({
      where: {
        full_name: process.env.TEACHER_SEEDUSER,
        id_school: 1,
        email: process.env.TEACHER_SEEDEMAIL,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Teacher Created');
      }
      return console.error('❌save undefined');
    })
    .then(() => Class.findOrCreate({
      where: {
        class_name: 'US History I',
        period: 1,
        start_time: '8:00 AM',
        end_time: '9:00 AM',
        id_school: 1,
        id_teacher: 1,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Class Created');
      }
      return console.error('❌save undefined');
    })
    .then(() => Student_class.findOrCreate({
      where: {
        id_class: 1,
        id_student: 1,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Class/Student Association Created');
      }
      return console.error('❌save undefined');
    })
    .then(() => Announcement.findOrCreate({
      where: {
        id: 1,
        announcement_title: 'Holiday Friday!',
        description: 'Have a nice 3-day weekend!',
        release_time: 'end of day',
        expiration_date: 'end of week',
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Announcement Created');
      }
      return console.error('❌save undefined');
    })
    .then(() => Assignment.findOrCreate({
      where: {
        assignment_name: 'Who was the best US President?',
        description: '3 pages, long-form',
        release_time: 'start of class',
        due_date: '2001-10-29',
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Assignment Created');
      }
      return console.error('❌save undefined');
    })
    .then(() => Assignment_class.findOrCreate({
      where: {
        id_assignment: 1,
        id_class: 1,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Assignment_class association Created');
      }
      return console.error('❌save undefined');
    })
    .then(() => Assignment_student.findOrCreate({
      where: {
        id_assignment: 1,
        id_student: 1,
        drive_url: 'myDrive@google.com',
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Assignment_student associationCreated');
      }
      return console.error('❌save undefined');
    })
    .then(() => Announcement_class.findOrCreate({
      where: {
        id_announcement: 1,
        id_class: 1,
      },
    }))
    .then((numberEffected) => {
      if (numberEffected) {
        return console.log('✅ Announcement_class association Created');
      }
      return console.error('❌save undefined');
    })
    // .then(() => Student.findOrCreate({
    //   where: {
    //     full_name: 'Jimmy Kimmel',
    //     id_school: 1,
    //     email: 'JKimmeln@HHS.edu',
    //   },
    // }))
    // .then((numberEffected) => {
    //   if (numberEffected) {
    //     return console.log('✅ Student Created');
    //   }
    //   return console.error('❌save undefined');
    // })
    // .then(() => Teacher.findOrCreate({
    //   where: {
    //     full_name: 'Abraham Lincoln',
    //     id_school: 1,
    //     email: 'ALincoln@HHS.edu',
    //   },
    // }))
    // .then((numberEffected) => {
    //   if (numberEffected) {
    //     return console.log('✅ Teacher Created');
    //   }
    //   return console.error('❌save undefined');
    // })
    // .then(() => Class.findOrCreate({
    //   where: {
    //     class_name: 'US History II',
    //     period: 2,
    //     start_time: '9:00 AM',
    //     end_time: '10:00 AM',
    //     id_school: 1,
    //     id_teacher: 2,
    //   },
    // }))
    // .then((numberEffected) => {
    //   if (numberEffected) {
    //     return console.log('✅ Class Created');
    //   }
    //   return console.error('❌save undefined');
    // })
    // .then(() => Student_class.findOrCreate({
    //   where: {
    //     id_class: 2,
    //     id_student: 2,
    //   },
    // }))
    // .then((numberEffected) => {
    //   if (numberEffected) {
    //     return console.log('✅ Class/Student Association Created');
    //   }
    //   return console.error('❌save undefined');
    // })
    // .then(() => Student_class.findOrCreate({
    //   where: {
    //     id_class: 1,
    //     id_student: 2,
    //   },
    // }))
    // .then((numberEffected) => {
    //   if (numberEffected) {
    //     return console.log('✅ Class/Student Association Created');
    //   }
    //   return console.error('❌save undefined');
    // })
    // .then(() => Announcement.findOrCreate({
    //   where: {
    //     id: 2,
    //     announcement_title: 'Pep Rally Thursday',
    //     description: 'Bring Spirit!',
    //     release_time: 'end of day',
    //     expiration_date: 'end of week',
    //   },
    // }))
    // .then((numberEffected) => {
    //   if (numberEffected) {
    //     return console.log('✅ Announcement Created');
    //   }
    //   return console.error('❌save undefined');
    // })
    // .then(() => Assignment.findOrCreate({
    //   where: {
    //     assignment_name: 'Who was the worst US President?',
    //     description: '3 pages, long-form',
    //     release_time: 'start of class',
    //     due_date: '2001-10-29',
    //   },
    // }))
    // .then((numberEffected) => {
    //   if (numberEffected) {
    //     return console.log('✅ Assignment Created');
    //   }
    //   return console.error('❌save undefined');
    // })
    // .then(() => Assignment_class.findOrCreate({
    //   where: {
    //     id_assignment: 2,
    //     id_class: 2,
    //   },
    // }))
    // .then((numberEffected) => {
    //   if (numberEffected) {
    //     return console.log('✅ Assignment_class association Created');
    //   }
    //   return console.error('❌save undefined');
    // })
    // .then(() => Assignment_student.findOrCreate({
    //   where: {
    //     id_assignment: 2,
    //     id_student: 2,
    //     drive_url: 'myDrive@google.com',
    //   },
    // }))
    // .then((numberEffected) => {
    //   if (numberEffected) {
    //     return console.log('✅ Assignment_student associationCreated');
    //   }
    //   return console.error('❌save undefined');
    // })
    // .then(() => Announcement_class.findOrCreate({
    //   where: {
    //     id_announcement: 2,
    //     id_class: 2,
    //   },
    // }))
    // .then((numberEffected) => {
    //   if (numberEffected) {
    //     return console.log('✅ Announcement_class association Created');
    //   }
    //   return console.error('❌save undefined');
    // })
    .catch((err) => {
      console.error(`❌${err}`);
    });
}

primeDB();
