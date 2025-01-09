'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate({ User, Notebook }) {
      // Note принадлежит Notebook
      this.belongsTo(Notebook, { foreignKey: 'notebookId', as: 'notebook' });

      // Note принадлежит User
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }
  }

  Note.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      notebookId: DataTypes.INTEGER,
      answer: DataTypes.TEXT, 
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Note',
    },
  );

  return Note;
};
