const { User } = require('../../db/models');

module.exports = {
  async getAllUsers() {
    return await User.findAll();
  },

  async getUserById(id) {
    return await User.findByPk(id);
  },

  async createUser(userData) {
    return await User.create(userData);
  },

  async updateUser(id, userData) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.update(userData);
  },

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return user;
  },
};
