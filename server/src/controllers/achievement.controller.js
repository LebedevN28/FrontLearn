const achievementService = require('../services/achievement.service');

module.exports = {
  async getAllAchievements(req, res) {
    try {
      const achievements = await achievementService.getAllAchievements();      
      res.status(200).json(achievements);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching achievements' });
    }
  },

  async getAchievementById(req, res) {
    try {
      const { id } = req.params;
      const achievement = await achievementService.getAchievementById(id);
      if (!achievement) {
        return res.status(404).json({ message: 'Achievement not found' });
      }
      res.status(200).json(achievement);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching achievement' });
    }
  },

  async createAchievement(req, res) {
    try {
      const achievementData = req.body;
      const newAchievement = await achievementService.createAchievement(achievementData);
      res.status(201).json(newAchievement);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating achievement' });
    }
  },

  async updateAchievement(req, res) {
    try {
      const { id } = req.params;
      const achievementData = req.body;
      const updatedAchievement = await achievementService.updateAchievement(
        id,
        achievementData,
      );
      if (!updatedAchievement) {
        return res.status(404).json({ message: 'Achievement not found' });
      }
      res.status(200).json(updatedAchievement);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating achievement' });
    }
  },

  async deleteAchievement(req, res) {
    try {
      const { id } = req.params;
      const deletedAchievement = await achievementService.deleteAchievement(id);
      if (!deletedAchievement) {
        return res.status(404).json({ message: 'Achievement not found' });
      }
      res.status(200).json({ message: 'Achievement deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting achievement' });
    }
  },
};
