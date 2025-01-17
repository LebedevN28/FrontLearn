'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    static associate({ Task }) {
      this.hasMany(Task, { foreignKey: 'moduleId' });
    }
  }
  Module.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Module',
    },
  );
  return Module;
};
