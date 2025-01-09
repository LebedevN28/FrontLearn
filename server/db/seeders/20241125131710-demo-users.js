'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        name: 'John Doe',
        email: 'john@doe.com',
        password: await bcrypt.hash('123', 10),
      },
      {
        name: 'Jane Doe',
        email: 'jane@doe.com',
        password: await bcrypt.hash('123', 10),
      },
    ].map((user) => ({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
