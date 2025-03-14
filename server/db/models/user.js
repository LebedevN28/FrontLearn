'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Progress, Task, UserAchievement }) {
      this.hasMany(Progress, { foreignKey: 'userId' });
      this.belongsToMany(Task, {
        through: Progress,
        as: 'UserCompletedTasks',
        foreignKey: 'userId',
      });
      this.hasMany(UserAchievement, { foreignKey: 'userId' });
    }

    // Метод для пересчета уровня
    recalculateLevel() {
      return Math.floor(this.points / 100);
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      level: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeUpdate: (user) => {
          this.level = user.recalculateLevel();
        },
      },
    },
  );

  return User;
};
