const { Module } = require('../../db/models');

module.exports = {
  async getAllModules() {
    return await Module.findAll();
  },

  async getModuleById(id) {
    return await Module.findByPk(id);
  },

  async createModule(moduleData) {
    return await Module.create(moduleData);
  },

  async updateModule(id, moduleData) {
    const module = await Module.findByPk(id);
    if (!module) return null;
    return await module.update(moduleData);
  },

  async deleteModule(id) {
    const module = await Module.findByPk(id);
    if (!module) return null;
    await module.destroy();
    return module;
  },
};
