const models = require('../../db/models');

class NotebookService {
  #db;

  constructor(db) {
    this.#db = db;
  }

  // Получить все блокноты пользователя
  getAll(userId) {
    return this.#db.Notebook.findAll({
      where: { userId },
      include: [{ model: this.#db.Note, as: 'notes' }], // Получаем связанные заметки
    });
  }

  // Получить блокнот по ID
  getById(id) {
    return this.#db.Notebook.findByPk(id, {
      include: [{ model: this.#db.Note, as: 'notes' }],
    });
  }

  // Создать блокнот
  create(notebook) {
    return this.#db.Notebook.create(notebook);
  }

  // Обновить блокнот по ID
  async updateById(id, updatedNotebook) {
    try {
      const notebook = await this.#db.Notebook.findByPk(id);

      if (!notebook) {
        throw new Error('Notebook not found');
      }

      if (notebook.userId !== updatedNotebook.userId) {
        throw new Error('Unauthorized');
      }

      await notebook.update({ name: updatedNotebook.name });
      return notebook;
    } catch (error) {
      throw new Error(`Error updating notebook: ${error.message}`);
    }
  }

  // Удалить блокнот
  async delete(id, userId) {
    try {
      const notebook = await this.#db.Notebook.findByPk(id);

      if (!notebook) {
        throw new Error('Notebook not found');
      }

      if (notebook.userId !== userId) {
        throw new Error('Unauthorized');
      }

      return await this.#db.Notebook.destroy({ where: { id } });
    } catch (error) {
      throw new Error(`Error deleting notebook: ${error.message}`);
    }
  }
}

module.exports = new NotebookService(models);
