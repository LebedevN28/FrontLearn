const { UserAchievement, Achievement } = require('../../db/models');
const updateUserStats = require('./user.service'); // Предполагается, что у вас есть логика для работы со статистикой пользователя.

const achievementConditions = {
  level: (criteria, userStats) => {
    const requiredLevel = parseInt(criteria, 10);
    return !isNaN(requiredLevel) && userStats.level >= requiredLevel;
  },
  answers: (criteria, userStats) => {
    const requiredAnswers = parseInt(criteria, 10);
    return !isNaN(requiredAnswers) && userStats.totalAnswers >= requiredAnswers;
  },
};

module.exports = {
  async checkAndUpdateUserAchievements(userId) {
    try {
      // Получаем достижения и статистику пользователя
      const userStats = await userStatsService.getUserStats(userId);
      const allAchievements = await Achievement.findAll();
      const userAchievements = await UserAchievement.findAll({ where: { userId } });

      const unlockedAchievementIds = userAchievements.map((ua) => ua.achievementId);
      const newAchievements = allAchievements.filter((achievement) => {
        const condition = achievementConditions[achievement.type];
        if (!condition) {
          console.warn(`Achievement type "${achievement.type}" is not supported.`);
          return false;
        }
        return (
          !unlockedAchievementIds.includes(achievement.id) &&
          condition(achievement.criteria, userStats)
        );
      });

      // Сохраняем новые достижения
      const achievementsToSave = newAchievements.map((achievement) => ({
        userId,
        achievementId: achievement.id,
      }));
      await UserAchievement.bulkCreate(achievementsToSave);

      return newAchievements; // Возвращаем список новых достижений
    } catch (error) {
      console.error('Error checking achievements:', error);
      throw new Error('Failed to check and update achievements.');
    }
  },
};
