'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Modules', [
      {
        id: 1,
        title: 'Фаза 1',
        description: 'Основные концепции JavaScript для начинающих.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'Фаза 2',
        description: 'Изучение основных принципов работы с React.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: ' Фаза 3',
        description: 'Как использовать Redux для управления состоянием.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Modules', null, {});
  },
};
