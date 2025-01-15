'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Progress extends Model {
    static associate({ User, Task }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Task, { foreignKey: 'taskId' });
    }
  }
  Progress.init(
    {
      status: DataTypes.ENUM('not_started', 'in_progress', 'completed'),
      score: DataTypes.INTEGER,
      completedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Progress',
      tableName: 'Progress', // Укажите имя таблицы явно
    },
  );
  return Progress;
};
