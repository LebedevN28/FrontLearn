'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Progress', [
      {
        id: 1,
        userId: 1, // Ссылается на Users.id
        taskId: 1, // Ссылается на Tasks.id
        status: 'completed',
        score: 10,
        completedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 2,
        taskId: 2,
        status: 'in_progress',
        score: 5,
        completedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Progress', null, {});
  },
};
