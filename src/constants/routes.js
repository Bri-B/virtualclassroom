const baseURl = '';

const authRoot = `${baseURl}/auth`;
const teacherRoot = `${baseURl}/teacher`;
const studentRoot = `${baseURl}/student`;

export const TEACHER_ROUTES = {
  GET_ALL_TEACHERS: `${teacherRoot}/`,
  GET_TEACHER_BY_ID: `${teacherRoot}/ID/`, // :teacherID
  GET_TEACHER_BY_EMAIL: `${teacherRoot}/email/`, // :teacherEmail
  GET_TEACHER_BY_NAME: `${teacherRoot}/name/`, // :teacherName
  GET_ALL_CLASSES: `${teacherRoot}/classes/`, // :teacherID
  GET_SCHOOL_BY_TEACHID: `${teacherRoot}/school/`, // :teacherID
  GET_ALL_ANNOUNCE_BY_CLASS: `${teacherRoot}/announcement/`, // :classID
  GET_ALL_ASSIGN_BY_CLASS: `${teacherRoot}/assignment/`, // :classID
  PUT_UPDATE_CLASS: `${teacherRoot}/classes/`, // :classID
  PUT_EDIT_ASSIGN: `${teacherRoot}/edit/assignment/`, //
  PUT_EDIT_ANNOUCE: `${teacherRoot}/edit/announcement/`, //
  PUT_ADD_STUDENT_TO_CLASS: `${teacherRoot}/addStudentClass/`, // :studentID/:classID //
  DELETE_STUDENT_FROM_CLASS: `${teacherRoot}/deleteStudentClass/`, // :studentID/:classID
  DELETE_CLASS: `${teacherRoot}/classes/`, // :classID
  DELETE_ANNOUNCE: `${teacherRoot}/delete/announcement/`, //
  DELETE_ASSIGN: `${teacherRoot}/delete/assignment/`, //
  // classes you want to associate with this announcement
  POST_ANNOUNCEMENT: `${teacherRoot}/create/announcement/`,
  POST_ASSIGN: `${teacherRoot}/create/assignment/`,
  POST_ADD_CLASS: `${teacherRoot}/classes/`,
};
// need update student, delete assignment, delete announcement

export const STUDENT_ROUTES = {
  GET_STUDENT_BY_EMAIL: `${studentRoot}/email/`, // :studentEmail
  GET_STUDENT_BY_NAME: `${studentRoot}/name/`, // :studentName
  GET_STUDENT_BY_ID: `${studentRoot}/ID/`, // :studentID
  GET_ALL_STUDENTS: `${studentRoot}/`,
  GET_ALL_CLASSES_BY_STUD: `${studentRoot}/classes/`, // :studentID
  GET_SCHOOL_BY_STUDID: `${studentRoot}/school/`, // :studentID
  GET_ALL_ANNOUNCE_BY_CLASS: `${studentRoot}/announcement/`, // :classID
  GET_ALL_ASSIGN_BY_CLASS: `${studentRoot}/announcement/`, // :classID
  GET_ALL_ANNOUNCE_BY_STUDID: `${studentRoot}/announcement/studentID/`, // studentID
  GET_ALL_ASSIGN_BY_STUDID: `${studentRoot}/assignment/studentID/`, // studentID
  PUT_SUBMIT_ASSIGN: `${studentRoot}/submit/assignment/`,
};
export const AUTH_ROUTES = {
  GOOGLE: `${authRoot}/google`,
};
