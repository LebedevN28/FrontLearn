const models = require('../../db/models');

class NoteService {
  #db;

  constructor(db) {
    this.#db = db;
  }

  // Получить все заметки
  getAll(userId) {
    return this.#db.Note.findAll({
      where: { userId },
      include: [{ model: this.#db.Notebook, as: 'notebook' }],
    });
  }

  // Получить заметку по ID
  getById(id) {
    return this.#db.Note.findByPk(id, {
      include: [
        { model: this.#db.User, as: 'user' },
        { model: this.#db.Notebook, as: 'notebook' },
      ],
    });
  }

  // Создать новую заметку
  create(note) {
    return this.#db.Note.create(note);
  }

  // Обновить заметку по ID
  async updateById(id, updatedNote) {
    try {
      const note = await this.#db.Note.findByPk(id);
      // console.log('init note', {note: note.get()})
      if (!note) {
        throw new Error('Note not found');
      }

      const { userId, ...updateData } = updatedNote;

      if (note.userId !== userId) {
        throw new Error('Unauthorized');
      }

      await note.update(updateData); // Обновляем разрешенные поля
      const updated = await this.#db.Note.findByPk(id);
      return updated;
    } catch (error) {
      throw new Error(`Error updating note: ${error.message}`);
    }
  }

  // Удалить заметку по ID
  async delete(id, userId) {
    try {
      const note = await this.#db.Note.findByPk(id);

      if (!note) {
        throw new Error('Note not found');
      }

      if (note.userId !== userId) {
        throw new Error('You are not authorized to delete this note');
      }

      return await this.#db.Note.destroy({ where: { id } });
    } catch (error) {
      throw new Error(`Error deleting note: ${error.message}`);
    }
  }
}

module.exports = new NoteService(models);
