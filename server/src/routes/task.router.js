const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.get('/difficulty/:difficulty', taskController.getTasksByDifficulty);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
