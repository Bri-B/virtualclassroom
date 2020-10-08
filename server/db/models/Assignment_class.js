/* eslint-disable camelcase */
module.exports = (sequelize) => {
  const Assignment_class = sequelize.define('assignment_class', {
  }, {
    freezeTableName: true,
  });

  return Assignment_class;
};
