const { Progress } = require('../../db/models');

module.exports = {
  async getAllProgress() {
    return await Progress.findAll();
  },

  async getProgressById(id) {
    return await Progress.findByPk(id);
  },

  async createProgress(progressData) {
    return await Progress.create(progressData);
  },

  async updateProgress(id, progressData) {
    const progress = await Progress.findByPk(id);
    if (!progress) return null;
    return await progress.update(progressData);
  },

  async deleteProgress(id) {
    const progress = await Progress.findByPk(id);
    if (!progress) return null;
    await progress.destroy();
    return progress;
  },
};
