'use strict';
const noteService = require('../services/note.service');
const sharp = require('sharp');
const fs = require('fs').promises;

class NoteController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  // Получение всех заметок
  getAll = async (req, res) => {
    try {
      const userId = res.locals.user?.id; // ID текущего пользователя
      if (!userId) {
        return res.status(403).json({ message: 'User not authorized' });
      }
      const notes = await this.#service.getAll(userId);
      res.status(200).json(notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
      res.status(500).json({ message: 'Error fetching notes', details: error.message });
    }
  };

  // Получение заметки по ID
  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = res.locals.user?.id; // ID текущего пользователя
      const note = await this.#service.getById(id);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      if (note.userId !== userId) {
        return res.status(403).json({ message: 'Access denied' });
      }
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching note', details: error.message });
    }
  };

  // Создание новой заметки
  create = async (req, res) => {
    const { title, content, notebookId, answer } = req.body;

    try {
      if (!title || !content || !notebookId || !answer) {
        return res.status(400).json({
          message: 'Title, content, notebookId, and answer are required',
        });
      }

      const userId = res.locals.user?.id; // Получаем ID пользователя
      if (!userId) {
        return res.status(403).json({ message: 'User not authorized' });
      }

      // Создаем заметку в БД
      const result = await this.#service.create({
        title,
        content,
        notebookId,
        answer,
        userId,
      });

      res.status(201).json(result);
    } catch (error) {
      console.error('Ошибка при создании заметки:', error);
      res.status(500).json({ message: 'Error creating note', details: error.message });
    }
  };

  // Обновление заметки
  updateOne = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, notebookId, answer } = req.body;
      const userId = res.locals.user?.id;

      const note = await this.#service.getById(id);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }

      if (note.userId !== userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      const updatedNote = await this.#service.updateById(id, {
        title,
        content,
        notebookId,
        answer,
        userId,
      });

      res.status(200).json(updatedNote);
    } catch (error) {
      console.error('Error updating note:', error);
      res.status(500).json({ message: 'Error updating note', details: error.message });
    }
  };

  // Удаление заметки
  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = res.locals.user?.id;

      const note = await this.#service.getById(id);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }

      if (note.userId !== userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      await this.#service.delete(id, userId);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ message: 'Error deleting note', details: error.message });
    }
  };
}

module.exports = new NoteController(noteService);
