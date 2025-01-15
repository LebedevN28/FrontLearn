'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAchievement extends Model {
    static associate({ User, Achievement }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Achievement, { foreignKey: 'achievementId' });
    }
  }
  UserAchievement.init(
    {
      unlockedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'UserAchievement',
    },
  );
  return UserAchievement;
};
