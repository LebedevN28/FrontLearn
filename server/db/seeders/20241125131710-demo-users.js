'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        password: 'hashedpassword123',
        level: 5,
        points: 120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Bob',
        email: 'bob@example.com',
        password: 'hashedpassword456',
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
