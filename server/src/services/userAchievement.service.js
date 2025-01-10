const { UserAchievement } = require('../../db/models');

module.exports = {
  async getAllUserAchievements() {
    return await UserAchievement.findAll();
  },

  async getUserAchievementById(id) {
    return await UserAchievement.findByPk(id);
  },

  async createUserAchievement(userAchievementData) {
    return await UserAchievement.create(userAchievementData);
  },

  async updateUserAchievement(id, userAchievementData) {
    const userAchievement = await UserAchievement.findByPk(id);
    if (!userAchievement) return null;
    return await userAchievement.update(userAchievementData);
  },

  async deleteUserAchievement(id) {
    const userAchievement = await UserAchievement.findByPk(id);
    if (!userAchievement) return null;
    await userAchievement.destroy();
    return userAchievement;
  },
};
