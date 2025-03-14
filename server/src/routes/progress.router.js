const { Router } = require('express');
const progressRouter = Router();
const progressController = require('../controllers/progress.controller');

progressRouter
  .route('/total/:userId')
  .get(progressController.getTotalProgress)
  .post(progressController.createProgress);

progressRouter
  .route('/module/:userId/:moduleId')
  .get(progressController.getModuleProgress);

progressRouter.route('/task/:userId/:taskId').get(progressController.getTaskProgress);

module.exports = progressRouter;
