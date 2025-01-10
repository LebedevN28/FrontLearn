'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Achievement extends Model {
    static associate({ UserAchievement }) {
      this.hasMany(UserAchievement, { foreignKey: 'achievementId' });
    }
  }
  Achievement.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      type: DataTypes.ENUM('level', 'questions', 'module', 'custom'),
      criteria: DataTypes.JSON,
      points: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Achievement',
    },
  );
  return Achievement;
};
