const { Router } = require('express');
const userRouter = Router();
const upload = require('../middlewares/upload');
const userController = require('../controllers/user.controller');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

userRouter.get('/', userController.getAllUsers);
userRouter
  .route('/:id')
  .get(verifyAccessToken, userController.getUserById)
  .patch(verifyAccessToken, userController.updateUserInfo)
  .delete(verifyAccessToken, userController.deleteUser);

userRouter
  .route('/:id/image')
  .patch(verifyAccessToken, upload.single('image'), userController.updateUserPhoto);

module.exports = userRouter;
