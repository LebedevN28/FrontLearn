const userAchievementService = require('../services/userAchievement.service');

module.exports = {
  // Получить все достижения пользователя
  async getUserAchievements(req, res) {
    try {
      const { userId } = req.params; // Получаем ID пользователя из параметров
      const userAchievements = await userAchievementService.getUserAchievements(userId);
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
      const newAchievements = await userAchievementService.createUserAchievements(
        userId,
        achievements,
      );
      res.status(201).json(newAchievements);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user achievements' });
    }
  },
};
