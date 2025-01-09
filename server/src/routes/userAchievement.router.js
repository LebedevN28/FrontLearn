const express = require('express');
const router = express.Router();
const userAchievementController = require('../controllers/userAchievement.controller');

router.get('/', userAchievementController.getAllUserAchievements);
router.get('/:id', userAchievementController.getUserAchievementById);
router.post('/', userAchievementController.createUserAchievement);
router.put('/:id', userAchievementController.updateUserAchievement);
router.delete('/:id', userAchievementController.deleteUserAchievement);

module.exports = router;
