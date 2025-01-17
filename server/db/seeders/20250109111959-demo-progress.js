'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Progress', [
      {
        userId: 3,
        taskId: 1,
        gotCorrect: true,
        completedAt: new Date(),
      },
      {
        userId: 3,
        taskId: 2,
        gotCorrect: false,
        completedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Progress', null, {});
  },
};
