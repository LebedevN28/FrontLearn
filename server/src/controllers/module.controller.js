const moduleService = require('../services/module.service');

module.exports = {
  async getAllModules(req, res) {
    try {
      const modules = await moduleService.getAllModules();
      res.status(200).json(modules);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching modules' });
    }
  },

  async getModuleById(req, res) {
    try {
      const { id } = req.params;
      const module = await moduleService.getModuleById(id);
      if (!module) {
        return res.status(404).json({ message: 'Module not found' });
      }
      res.status(200).json(module);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching module' });
    }
  },

  async createModule(req, res) {
    try {
      const moduleData = req.body;
      const newModule = await moduleService.createModule(moduleData);
      res.status(201).json(newModule);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating module' });
    }
  },

  async updateModule(req, res) {
    try {
      const { id } = req.params;
      const moduleData = req.body;
      const updatedModule = await moduleService.updateModule(id, moduleData);
      if (!updatedModule) {
        return res.status(404).json({ message: 'Module not found' });
      }
      res.status(200).json(updatedModule);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating module' });
    }
  },

  async deleteModule(req, res) {
    try {
      const { id } = req.params;
      const deletedModule = await moduleService.deleteModule(id);
      if (!deletedModule) {
        return res.status(404).json({ message: 'Module not found' });
      }
      res.status(200).json({ message: 'Module deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting module' });
    }
  },
};
