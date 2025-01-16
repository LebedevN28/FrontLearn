'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Nikita',
        email: 'nikita@mail.ru',
        password: await bcrypt.hash('qwertY1@', 10),
        level: 2,
        points: 220,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bob',
        email: 'bob@example.com',
        password: await bcrypt.hash('qwertY1@', 10),
        level: 3,
        points: 380,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Anya',
        email: 'bilberian@mail.ru',
        password: await bcrypt.hash('qwertY1@', 10),
        level: 5,
        points: 550,
        image: 'image-1736780107521-442064739.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Igor',
        email: 'mortek90@mail.ru',
        password: await bcrypt.hash('qwertY1@', 10),
        level: 3,
        points: 310,
        image: 'image-Igor.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sasha',
        email: 'sasha@mail.ru',
        password: await bcrypt.hash('qwertY1@', 10),
        level: 4,
        points: 450,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
