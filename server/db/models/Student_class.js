/* eslint-disable camelcase */
module.exports = (sequelize) => {
  const Student_class = sequelize.define('student_class', {
  }, {
    freezeTableName: true,
  });

  return Student_class;
};
