const userAchievementService = require('../services/userAchievement.service');

module.exports = {
  // Получить все достижения пользователя
  async getUserAchievements(req, res) {
    try {
      const { userId } = req.params; // Получаем ID пользователя из параметров
      const userAchievements = await userAchievementService.getUserAchievements(userId);
      console.log('User Achievements from DB:', userAchievements); // Логируем данные из базы

      res.status(200).json(userAchievements);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching user achievements' });
    }
  },

  // Добавить достижения для пользователя
  async createUserAchievements(req, res) {
    try {
      const { userId } = req.params;
      const { achievements } = req.body; // Список ID достижений

      // Получаем существующие достижения пользователя
      const existingAchievements = await userAchievementService.getUserAchievements(
        userId,
      );

      // Создаём Set для быстрого поиска существующих ID
      const existingIds = new Set(
        existingAchievements.map((achievement) => achievement.achievementId),
      );

      // Фильтруем только новые достижения
      const newAchievements = achievements.filter((id) => !existingIds.has(id));

      if (newAchievements.length === 0) {
        return res.status(200).json({ message: 'No new achievements to add' });
      }

      // Добавляем только новые достижения
      const addedAchievements = await userAchievementService.createUserAchievements(
        userId,
        newAchievements,
      );

      res.status(201).json(addedAchievements);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user achievements' });
    }
  },
  async checkUserAchievements(req, res) {
    try {
      const { userId } = req.params;
      const newAchievements = await userAchievementService.checkAndUpdateUserAchievements(
        userId,
      );

      res.status(200).json(newAchievements);
    } catch (error) {
      console.error('Error checking user achievements:', error);
      res.status(500).json({ message: 'Failed to check achievements.' });
    }
  },
};
