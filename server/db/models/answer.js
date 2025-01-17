'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    static associate({ Task }) {
      this.belongsTo(Task, { foreignKey: 'taskId' });
    }
  }
  Answer.init(
    {
      content: DataTypes.TEXT,
      isCorrect: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Answer',
    },
  );
  return Answer;
};
