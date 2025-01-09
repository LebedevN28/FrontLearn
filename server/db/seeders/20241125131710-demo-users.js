'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Nikita',
        email: 'nikita@mail.ru',
        password: await bcrypt.hash('123', 10),
        level: 5,
        points: 120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bob',
        email: 'bob@example.com',
        password: await bcrypt.hash('123', 10),
        level: 3,
        points: 80,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
