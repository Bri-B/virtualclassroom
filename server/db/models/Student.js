module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('student', {
    full_name: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {
    freezeTableName: true,
  });

  Student.associate = (models) => {
    Student.belongsToMany(models.Assignment, {
      through: models.Assignment_student,
      foreignKey: 'id_student',
    });
    Student.belongsToMany(models.Class, {
      through: models.Student_class,
      foreignKey: 'id_student',
    });
    Student.belongsTo(models.School, {
      foreignKey: 'id_school',
    });
  };

  return Student;
};
