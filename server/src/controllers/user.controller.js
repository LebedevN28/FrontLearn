const userService = require('../services/user.service');
const removeImage = require('../utils/removeImage');

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching user' });
    }
  },

  async updateUserAccount(req, res) {
    try {
      const userData = req.body;
      const { id } = req.params;
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ text: 'Пользователь не найден' });
      }
      if (userData.email && userData.email !== user.email) {
        const existingUser = await userService.getUserByEmail(userData.email);
        if (existingUser) {
          return res.status(400).json({ text: 'Этот email уже используется' });
        }
      }
      const updatedUser = await userService.updateUser(id, userData);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        text: 'Ошибка изменения информации о пользователе',
        message: error.message,
      });
    }
  },

  async updateUserPhoto(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ text: `Пользователь с ID ${id} не найден` });
      }

      if (req.file) {
        const newFilename = req.file.filename;
        if (user.image) {
          await removeImage(user.image);
        }
        await userService.updateUser(id, { image: newFilename });
        user.image = newFilename;
      }

      res.json(user);
    } catch (error) {
      console.error('Ошибка при обновлении фото:', error);
      res.status(500).json({
        text: 'Ошибка изменения фотографии пользователя',
        message: error.message,
      });
    }
  },

  async updateUserPoints(req, res) {
    try {
      const { id } = req.params;
      const { points } = req.body;
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ text: 'Пользователь не найден' });
      }
      const newPoints = user.points + points;
      const updUser = await userService.updateUser(id, { points: newPoints });
      res.status(200).json(updUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user points' });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ text: 'Пользователь не найден' });
      }
      await removeImage(user.image);
      await userService.deleteUser(id);

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting user' });
    }
  },
};
