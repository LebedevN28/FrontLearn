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
      userId: DataTypes.INTEGER,
      taskId: DataTypes.INTEGER,
      gotCorrect: DataTypes.BOOLEAN,
      completedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Progress',
      tableName: 'Progress', // Указано имя таблицы явно (иначе ищет Progresses)
    },
  );
  return Progress;
};
