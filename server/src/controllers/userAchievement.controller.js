const userAchievementService = require('../services/userAchievement.service');

module.exports = {
  async getAllUserAchievements(req, res) {
    try {
      const userAchievements = await userAchievementService.getAllUserAchievements();
      res.status(200).json(userAchievements);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching user achievements' });
    }
  },

  async getUserAchievementById(req, res) {
    try {
      const { id } = req.params;
      const userAchievement = await userAchievementService.getUserAchievementById(id);
      if (!userAchievement) {
        return res.status(404).json({ message: 'User achievement not found' });
      }
      res.status(200).json(userAchievement);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching user achievement' });
    }
  },

  async createUserAchievement(req, res) {
    try {
      const userAchievementData = req.body;
      const newUserAchievement = await userAchievementService.createUserAchievement(
        userAchievementData,
      );
      res.status(201).json(newUserAchievement);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user achievement' });
    }
  },

  async updateUserAchievement(req, res) {
    try {
      const { id } = req.params;
      const userAchievementData = req.body;
      const updatedUserAchievement = await userAchievementService.updateUserAchievement(
        id,
        userAchievementData,
      );
      if (!updatedUserAchievement) {
        return res.status(404).json({ message: 'User achievement not found' });
      }
      res.status(200).json(updatedUserAchievement);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user achievement' });
    }
  },

  async deleteUserAchievement(req, res) {
    try {
      const { id } = req.params;
      const deletedUserAchievement = await userAchievementService.deleteUserAchievement(
        id,
      );
      if (!deletedUserAchievement) {
        return res.status(404).json({ message: 'User achievement not found' });
      }
      res.status(200).json({ message: 'User achievement deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting user achievement' });
    }
  },
};
