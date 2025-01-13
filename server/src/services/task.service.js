const { Task } = require('../../db/models');

module.exports = {
  /** ***********  ✨ Codeium Command ⭐  ************ */
  /**
   * Retrieves all tasks from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of task objects.
   */

  /** ****  7c864eb7-e22d-4493-bfc4-8f53851c54a6  ****** */
  async getAllTasks() {
    return await Task.findAll();
  },

  async getTaskById(id) {
    return await Task.findByPk(id);
  },

  async createTask(taskData) {
    return await Task.create(taskData);
  },

  async updateTask(id, taskData) {
    const task = await Task.findByPk(id);
    if (!task) return null;
    return await task.update(taskData);
  },

  async deleteTask(id) {
    const task = await Task.findByPk(id);
    if (!task) return null;
    await task.destroy();
    return task;
  },

  async getTaskByModuleId(moduleId) {
    const task = await Task.findAll({
      where: {
        moduleId,
      },
    });
    return task;
  },
};
