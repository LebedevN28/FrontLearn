'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notebook extends Model {
    static associate({ User, Note }) {
      // Notebook принадлежит User
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });

      // Notebook содержит много Note
      this.hasMany(Note, { foreignKey: 'notebookId', as: 'notes' });
    }
  }

  Notebook.init(
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Notebook',
    },
  );

  return Notebook;
};
