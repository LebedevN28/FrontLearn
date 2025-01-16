const taskService = require('../services/task.service');

module.exports = {
  async getAllTasks(req, res) {
    try {
      const tasks = await taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching tasks' });
    }
  },

  async getTaskById(req, res) {
    try {
      const { id } = req.params;
      const task = await taskService.getTaskById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      return res.status(200).json(task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching task' });
    }
  },

  async createTask(req, res) {
    try {
      const taskData = req.body;
      const newTask = await taskService.createTask(taskData);
      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating task' });
    }
  },

  async getTaskByModuleId(req, res) {
    try {
      const { moduleId } = req.params;
      const { difficulty } = req.query;

      const task = await taskService.getTaskByModuleId(moduleId, difficulty);

      if (!task || task.length === 0) {
        return res.status(404).json({ message: 'Вопросы не найдены для этого модуля' });
      }

      return res.status(200).json(task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка при получении вопросов' });
    }
  },
};
