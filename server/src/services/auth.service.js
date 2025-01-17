const models = require('../../db/models');

class UserService {
  #db;

  constructor(db) {
    this.#db = db;
  }

  getUser(email) {
    return this.#db.User.findOne({ where: { email } });
  }
  createUser(userData) {
    return this.#db.User.create(userData);
  }
}

module.exports = new UserService(models);
