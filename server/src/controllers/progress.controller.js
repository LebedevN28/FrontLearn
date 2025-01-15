const progressService = require('../services/progress.service');

module.exports = {
  async getAllProgress(req, res) {
    try {
      const progress = await progressService.getAllProgress();
      res.status(200).json(progress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching progress' });
    }
  },

  async getProgressById(req, res) {
    try {
      const { id } = req.params;
      const progress = await progressService.getProgressById(id);
      if (!progress) {
        return res.status(404).json({ message: 'Progress not found' });
      }
      res.status(200).json(progress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching progress' });
    }
  },

  async createProgress(req, res) {
    try {
      const progressData = req.body;
      const newProgress = await progressService.createProgress(progressData);
      res.status(201).json(newProgress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating progress' });
    }
  },

  async updateProgress(req, res) {
    try {
      const { id } = req.params;
      const progressData = req.body;
      const updatedProgress = await progressService.updateProgress(id, progressData);
      if (!updatedProgress) {
        return res.status(404).json({ message: 'Progress not found' });
      }
      res.status(200).json(updatedProgress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating progress' });
    }
  },

  async deleteProgress(req, res) {
    try {
      const { id } = req.params;
      const deletedProgress = await progressService.deleteProgress(id);
      if (!deletedProgress) {
        return res.status(404).json({ message: 'Progress not found' });
      }
      res.status(200).json({ message: 'Progress deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting progress' });
    }
  },
};
