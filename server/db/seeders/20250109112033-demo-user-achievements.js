'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserAchievements', [
      {
        id: 1,
        userId: 1,
        achievementId: 1,
        unlockedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserAchievements', null, {});
  },
};
