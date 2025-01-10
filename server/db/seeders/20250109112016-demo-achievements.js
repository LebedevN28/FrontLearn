'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Achievements', [
      {
        id: 1,
        title: 'Level 5 Achiever',
        description: 'Reach level 5.',
        type: 'level',
        criteria: JSON.stringify({ requiredLevel: 5 }),
        points: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Achievements', null, {});
  },
};
