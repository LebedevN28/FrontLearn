const noteController = require('../controllers/note.controller');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const noteRouter = require('express').Router();

// Маршрут для обработки загрузки файлов (если это потребуется)
const upload = require('../middlewares/multer');

// Роуты для Note
noteRouter
  .route('/')
  .get(verifyAccessToken, noteController.getAll) // Получить все заметки
  .post(verifyAccessToken, noteController.create); // Создать новую заметку

noteRouter
  .route('/:id')
  .get(verifyAccessToken, noteController.getById) // Получить заметку по ID
  .put(verifyAccessToken, noteController.updateOne) // Обновить заметку
  .delete(verifyAccessToken, noteController.delete); // Удалить заметку

module.exports = noteRouter;
