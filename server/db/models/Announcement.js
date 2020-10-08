module.exports = (sequelize, DataTypes) => {
  const Announcement = sequelize.define('announcement', {
    announcement_title: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    release_time: {
      type: DataTypes.STRING,
    },
    expiration_date: {
      type: DataTypes.STRING,
    },
  }, {
    freezeTableName: true,
  });

  Announcement.associate = (models) => {
    Announcement.belongsToMany(models.Class, {
      through: models.Announcement_class,
      foreignKey: 'id_announcement',
    });
  };

  return Announcement;
};
