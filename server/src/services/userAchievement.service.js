const { UserAchievement, Achievement } = require('../../db/models');

module.exports = {
  // Получить все достижения пользователя
  async getUserAchievements(userId) {
    return await UserAchievement.findAll({
      where: { userId },
      include: [{ model: Achievement }],
    });
  },

  // Добавить достижения для пользователя
  async createUserAchievements(userId, achievementIds) {
    const records = achievementIds.map((achievementId) => ({
      userId,
      achievementId,
    }));

    // bulkCreate игнорирует дубликаты
    return await UserAchievement.bulkCreate(records, { ignoreDuplicates: true });
  },
};
