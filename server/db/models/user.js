'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Progress, Task, UserAchievement }) {
      this.hasMany(Progress, { foreignKey: 'userId' });
      this.belongsToMany(Task, {
        through: Progress,
        as: 'UserCompletedTasks',
        foreignKey: 'userId',
      });
      this.hasMany(UserAchievement, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      level: DataTypes.INTEGER,
      points: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
