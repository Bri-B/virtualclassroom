const baseURl = '';

const authRoot = `${baseURl}/auth`;
const teacherRoot = `${baseURl}/teacher`;
const studentRoot = `${baseURl}/student`;

export const TEACHER_ROUTES = {
  GET_TEACHER_BY_EMAIL: `${teacherRoot}/email/`, // :teacherEmail
  GET_TEACHER_BY_ID: `${teacherRoot}/ID/`, // :teacherID
  GET_ALL_TEACHERS: `${teacherRoot}/`,
  GET_ALL_CLASSES: `${teacherRoot}/classes/`, // :teacherID
  GET_SCHOOL_BY_TEACHID: `${teacherRoot}/school/`, // :teacherID
  PUT_UPDATE_CLASS: `${teacherRoot}/classes/`, // :classID
  PUT_ADD_STUDENT: `${teacherRoot}/addStudentClass/`, // :studentID/:classID //?? should be post
  DELETE_STUDENT_FROM_CLASS: `${teacherRoot}/deleteStudentClass/`, // :studentID/:classID
  DELETE_CLASS: `${teacherRoot}/classes/`, // :classID
  POST_ANNOUNCEMENT: `${teacherRoot}/create/announcement/`,
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
  GET_ALL_ASSIGN_BY_CLASS: `${studentRoot}/assignment/`, // :classID
  POST_SUBMIT_ASSIGN: `${studentRoot}/submit/assignment/`, // :classID
};
export const AUTH_ROUTES = {
  GOOGLE: `${authRoot}/google`,
};
