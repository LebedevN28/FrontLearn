'use strict';
const notebookService = require('../services/notebook.service');

class NotebookController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  // Получить все блокноты пользователя
  getAll = async (req, res) => {
    try {
      const userId = res.locals.user?.id;
      if (!userId) {
        return res.status(403).json({ message: 'User not authorized' });
      }

      const notebooks = await this.#service.getAll(userId);
      res.status(200).json(notebooks);
    } catch (error) {
      console.error('Error fetching notebooks:', error);
      res
        .status(500)
        .json({ message: 'Error fetching notebooks', details: error.message });
    }
  };

  // Получить блокнот по ID
  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const notebook = await this.#service.getById(id);

      if (!notebook) {
        return res.status(404).json({ message: 'Notebook not found' });
      }

      res.status(200).json(notebook);
    } catch (error) {
      console.error('Error fetching notebook:', error);
      res
        .status(500)
        .json({ message: 'Error fetching notebook', details: error.message });
    }
  };

  // Создать новый блокнот
  create = async (req, res) => {
    try {
      const { name } = req.body;
      const userId = res.locals.user?.id;

      if (!name || !userId) {
        return res.status(400).json({ message: 'Notebook name is required' });
      }

      const newNotebook = await this.#service.create({ name, userId });
      res.status(201).json(newNotebook);
    } catch (error) {
      console.error('Error creating notebook:', error);
      res
        .status(500)
        .json({ message: 'Error creating notebook', details: error.message });
    }
  };

  // Обновить блокнот
  updateOne = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const userId = res.locals.user?.id;

      const updatedNotebook = await this.#service.updateById(id, { name, userId });

      res.status(200).json(updatedNotebook);
    } catch (error) {
      console.error('Error updating notebook:', error);
      res
        .status(500)
        .json({ message: 'Error updating notebook', details: error.message });
    }
  };

  // Удалить блокнот
  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = res.locals.user?.id;

      await this.#service.delete(id, userId);

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting notebook:', error);
      res
        .status(500)
        .json({ message: 'Error deleting notebook', details: error.message });
    }
  };
}

module.exports = new NotebookController(notebookService);
