const { Task } = require('../../db/models');

module.exports = {
  /** ***********  ✨ Codeium Command ⭐  ************ */
  /**
   * Retrieves all tasks from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of task objects.
   */

  /** ****  7c864eb7-e22d-4493-bfc4-8f53851c54a6  ****** */
  async getAllTasks() {
    return Task.findAll();
  },

  async getTaskById(id) {
    return Task.findByPk(id);
  },

  // async createTask(taskData) {
  //   return  Task.create(taskData);
  // },

  // async updateTask(id, taskData) {
  //   const task = await Task.findByPk(id);
  //   if (!task) return null;
  //   return  task.update(taskData);
  // },

  // async deleteTask(id) {
  //   const task = await Task.findByPk(id);
  //   if (!task) return null;
  //   await task.destroy();
  //   return task;
  // },

  async getTaskByModuleId(moduleId, difficulty) {
    if (!difficulty) {
      const task = await Task.findAll({
        where: {
          moduleId,
        },
      });
      return task;
    }
    const task = await Task.findAll({
      where: {
        moduleId,
        difficulty,
      },
    });
    return task;
  },
};
