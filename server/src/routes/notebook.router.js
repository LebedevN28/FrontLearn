const notebookController = require('../controllers/notebook.controller');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const notebookRouter = require('express').Router();

notebookRouter
  .route('/')
  .get(verifyAccessToken, notebookController.getAll) // Получить все блокноты
  .post(verifyAccessToken, notebookController.create); // Создать новый блокнот

notebookRouter
  .route('/:id')
  .get(verifyAccessToken, notebookController.getById) // Получить блокнот по ID
  .put(verifyAccessToken, notebookController.updateOne) // Обновить блокнот
  .delete(verifyAccessToken, notebookController.delete); // Удалить блокнот

module.exports = notebookRouter;
