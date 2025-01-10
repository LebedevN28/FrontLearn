'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Answers', [
      {
        id: 1,
        taskId: 1,
        content: 'JavaScript library for building UIs',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        taskId: 1,
        content: 'A CSS framework',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Answers', null, {});
  },
};
