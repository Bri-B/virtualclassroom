/* eslint-disable camelcase */
module.exports = (sequelize) => {
  const Announcement_class = sequelize.define('announcement_class', {
  }, {
    freezeTableName: true,
  });

  return Announcement_class;
};
