const progressService = require('../services/progress.service');

module.exports = {
  async getTotalProgress(req, res) {
    try {
      const { userId } = req.params;
      const progress = await progressService.getUserProgressTotal(userId);
      res.status(200).json(progress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching progress' });
    }
  },

  async getModuleProgress(req, res) {
    try {
      const { userId, moduleId } = req.params;
      const progress = await progressService.getUserProgressModule(userId, moduleId);
      res.status(200).json(progress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching progress' });
    }
  },

  async getTaskProgress(req, res) {
    try {
      const { userId, taskId } = req.params;
      const progress = await progressService.getUserProgressTask(userId, taskId);
      res.status(200).json(progress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching progress' });
    }
  },

  async createProgress(req, res) {
    try {
      const { userId } = req.params;
      const { taskId, gotCorrect } = req.body;
      const newProgress = await progressService.createUserProgress(
        userId,
        taskId,
        gotCorrect,
      );
      res.status(201).json(newProgress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating progress' });
    }
  },
};
