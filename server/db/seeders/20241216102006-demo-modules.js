'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Modules', [
      {
        id: 1,
        title: 'Основы JavaScript. Фаза 1.',
        description: 'Основные концепции JavaScript для начинающих.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'Основы React. Фаза 2.',
        description: 'Изучение основных принципов работы с React.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: 'Работа с Redux. Фаза 3.',
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
