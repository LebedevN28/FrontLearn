'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate({ Answer, User, Progress, Module }) {
      this.hasMany(Answer, { foreignKey: 'taskId' });
      this.hasMany(Progress, { foreignKey: 'taskId' });
      this.belongsToMany(User, {
        through: Progress,
        as: 'UsersDoneTask',
        foreignKey: 'taskId',
      });
      this.belongsTo(Module, { foreignKey: 'moduleId' });
    }
  }
  Task.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      type: DataTypes.ENUM('multiple_choice', 'text_input'),
      difficulty: DataTypes.ENUM('easy', 'medium', 'hard'),
    },
    {
      sequelize,
      modelName: 'Task',
    },
  );
  return Task;
};
