module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('assignment', {
    assignment_name: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    due_date: {
      type: DataTypes.DATE,
    },
    release_time: {
      type: DataTypes.STRING,
    },
  }, {
    freezeTableName: true,
  });

  Assignment.associate = (models) => {
    Assignment.belongsToMany(models.Student, {
      through: models.Assignment_student,
      foreignKey: 'id_assignment',
    });
    Assignment.belongsToMany(models.Class, {
      through: models.Assignment_class,
      foreignKey: 'id_assignment',
    });
  };

  return Assignment;
};
