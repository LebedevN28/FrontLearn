const { Progress, Task } = require('../../db/models');

module.exports = {
  async getUserProgressTotal(userId) {
    try {
      return Progress.findAll({ where: { userId } });
    } catch (error) {
      console.error('Ошибка при получении прогресса пользователя:', error);
      throw error;
    }
  },

  async getUserProgressModule(userId, moduleId) {
    try {
      const userModuleProgress = await Task.findAll({
        where: { moduleId },
        include: [
          {
            model: Progress,
            where: { userId },
            required: true, // Только задачи с прогрессом
          },
        ],
      });
      return userModuleProgress; // вернет массив объектов Tasks с атрибутом Progress (у которого свой массив объектов прогресса с атрибутами в тч gotCorrect)
    } catch (error) {
      console.error('Ошибка при получении прогресса пользователя по модулю:', error);
      throw error;
    }
  },

  async getUserProgressTask(userId, taskId) {
    try {
      return Progress.findOne({ where: { userId, taskId } });
    } catch (error) {
      console.error('Ошибка при получении прогресса пользователя по задаче:', error);
      throw error;
    }
  },

  async createUserProgress(userId, taskId, gotCorrect) {
    try {
      return Progress.create({ userId, taskId, gotCorrect });
    } catch (error) {
      console.error('Ошибка при создании прогресса:', error);
      throw error;
    }
  },
};
