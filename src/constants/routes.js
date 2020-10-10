const baseURl = '';

const authRoot = `${baseURl}/auth`;
const teacherRoot = `${baseURl}/teacher`;

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

export const AUTH_ROUTES = {
  GOOGLE: `${authRoot}/google`,
};
