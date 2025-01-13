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
      res.status(200).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching task' });
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

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const taskData = req.body;
      const updatedTask = await taskService.updateTask(id, taskData);
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating task' });
    }
  },

  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const deletedTask = await taskService.deleteTask(id);
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting task' });
    }
  },

  // async getTasksByDifficulty(req, res) {
  //   try {
  //     const { difficulty } = req.params;
  //     const tasks = await taskService.getTasksByDifficulty(difficulty);

  //     if (!tasks || tasks.length === 0) {
  //       return res
  //         .status(404)
  //         .json({ message: `No tasks found with difficulty: ${difficulty}` });
  //     }
  //     res.status(200).json(tasks);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Error fetching tasks by difficulty' });
  //   }
  // },

  async getTaskByModuleId(req, res) {
    try {
      const { moduleId } = req.params;
      const task = await taskService.getTaskByModuleId(moduleId);

      if (!task || task.length === 0) {
        return res.status(404).json({ message: 'Вопросы не найдены для этого модуля' });
      }

      res.status(200).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при получении вопросов' });
    }
  },
};
