'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Progress, UserAchievement }) {
      this.hasMany(Progress, { foreignKey: 'userId' });
      this.hasMany(UserAchievement, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      level: DataTypes.INTEGER,
      points: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
