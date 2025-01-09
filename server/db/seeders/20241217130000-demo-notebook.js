'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const notebooks = [
      { name: 'Наука', userId: 1 },
      { name: 'История', userId: 1 },
      { name: 'Искусство', userId: 1 },
      { name: 'Технологии', userId: 1 },
      { name: 'Литература', userId: 1 },
      { name: 'География', userId: 1 },
    ].map((notebook) => ({
      ...notebook,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Notebooks', notebooks, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notebooks', null, {});
  },
};
