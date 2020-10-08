module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('class', {
    class_name: {
      type: DataTypes.STRING,
    },
    period: {
      type: DataTypes.INTEGER,
    },
    start_time: {
      type: DataTypes.TIME,
    },
    end_time: {
      type: DataTypes.TIME,
    },
  }, {
    freezeTableName: true,
  });

  Class.associate = (models) => {
    Class.belongsToMany(models.Student, {
      through: models.Student_class,
      foreignKey: 'id_class',
    });
    Class.belongsToMany(models.Announcement, {
      through: models.Announcement_class,
      foreignKey: 'id_class',
    });
    Class.belongsToMany(models.Assignment, {
      through: models.Assignment_class,
      foreignKey: 'id_class',
    });
    Class.belongsTo(models.School, {
      foreignKey: 'id_school',
    });
    Class.belongsTo(models.Teacher, {
      foreignKey: 'id_teacher',
    });
  };
  return Class;
};
