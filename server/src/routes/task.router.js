const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
// router.post('/', taskController.createTask);
router.get('/module/:moduleId', taskController.getTaskByModuleId);

// router.delete('/:id', taskController.deleteTask);

module.exports = router;
