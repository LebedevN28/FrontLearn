const { User } = require('../../db/models');

module.exports = {
  async getAllUsers() {
    try {
      return await User.findAll();
    } catch (error) {
      console.error('Ошибка при получении всех пользователей:', error);
      throw error;
    }
  },

  async getUserById(id) {
    try {
      return User.findByPk(id);
    } catch (error) {
      console.error('Ошибка при получении пользователя по ID:', error);
      throw error;
    }
  },

  async getUserByEmail(email) {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      console.error('Ошибка при получении пользователя по email:', error);
      throw error;
    }
  },

  async updateUser(id, userData) {
    try {
      const user = await User.findByPk(id);
      if (!user) return null;
      return await user.update(userData);
    } catch (error) {
      console.error('Ошибка при обновлении пользователя:', error);
      throw error;
    }
  },

  async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) return null;
      return await user.destroy();
    } catch (error) {
      console.error('Ошибка при обновлении пользователя:', error);
      throw error;
    }
  },
  async updateUserStats(id, stats) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return null; // Если пользователь не найден
      }
      // Обновляем статистику
      user.totalAnswers = stats.totalAnswers ?? user.totalAnswers;
      user.level = stats.level ?? user.level;
      await user.save();

      return user; // Возвращаем обновленного пользователя
    } catch (error) {
      console.error('Ошибка при обновлении статистики пользователя:', error);
      throw error;
    }
  },
};
