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
        name: 'Anya',
        email: 'bilberian@mail.ru',
        password: await bcrypt.hash('123', 10),
        level: 80,
        points: 3500,
        image: 'image-1736780107521-442064739.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Igor',
        email: 'mortek90@mail.ru',
        password: await bcrypt.hash('123', 10),
        level: 79,
        points: 3100,
        image: 'image-Igor.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sasha',
        email: 'sasha@mail.ru',
        password: await bcrypt.hash('123', 10),
        level: 45,
        points: 2500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
