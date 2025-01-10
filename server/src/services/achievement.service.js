const { Achievement } = require('../../db/models');

module.exports = {
  async getAllAchievements() {
    return await Achievement.findAll();
  },

  async getAchievementById(id) {
    return await Achievement.findByPk(id);
  },

  async createAchievement(achievementData) {
    return await Achievement.create(achievementData);
  },

  async updateAchievement(id, achievementData) {
    const achievement = await Achievement.findByPk(id);
    if (!achievement) return null;
    return await achievement.update(achievementData);
  },

  async deleteAchievement(id) {
    const achievement = await Achievement.findByPk(id);
    if (!achievement) return null;
    await achievement.destroy();
    return achievement;
  },
};
