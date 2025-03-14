const express = require('express');
const router = express.Router();
const userAchievementController = require('../controllers/userAchievement.controller');

// Получить все достижения пользователя
router.get('/:userId', userAchievementController.getUserAchievements);

// Добавить достижения пользователю
router.post('/:userId', userAchievementController.createUserAchievements);
router.post('/check/:userId', userAchievementController.checkUserAchievements);

module.exports = router;
