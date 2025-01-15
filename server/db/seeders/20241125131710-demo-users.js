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
      {
        name: 'Sasha',
        email: 'sasha@mail.ru',
        password: await bcrypt.hash('password123', 10),
        level: 4,
        points: 95,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alice',
        email: 'alice@example.com',
        password: await bcrypt.hash('securepass', 10),
        level: 2,
        points: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'John',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('mypassword', 10),
        level: 6,
        points: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Emily',
        email: 'emily@example.com',
        password: await bcrypt.hash('pass456', 10),
        level: 1,
        points: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Michael',
        email: 'michael@example.com',
        password: await bcrypt.hash('strongpass789', 10),
        level: 7,
        points: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
