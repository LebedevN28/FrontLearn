'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tasks', [
      // Модуль 1: Основы JavaScript
      {
        id: 1,
        moduleId: 1,
        title: 'Что такое переменная?',
        description: 'Объясните, что такое переменная в JavaScript.',
        type: 'multiple_choice',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        moduleId: 1,
        title: 'Типы данных в JavaScript',
        description: 'Перечислите основные типы данных в JavaScript.',
        type: 'multiple_choice',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        moduleId: 1,
        title: 'Что такое замыкание?',
        description: 'Опишите, что такое замыкание и где оно используется.',
        type: 'multiple_choice',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Модуль 2: Основы React
      {
        id: 4,
        moduleId: 2,
        title: 'Что такое JSX?',
        description: 'Объясните, что такое JSX и зачем он используется.',
        type: 'multiple_choice',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        moduleId: 2,
        title: 'Жизненные циклы компонентов',
        description: 'Назовите основные жизненные циклы компонентов React.',
        type: 'multiple_choice',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        moduleId: 2,
        title: 'Hooks в React',
        description: 'Объясните, зачем нужны хуки и как их использовать.',
        type: 'multiple_choice',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Модуль 3: Работа с Redux
      {
        id: 7,
        moduleId: 3,
        title: 'Что такое Redux?',
        description: 'Объясните, что такое Redux и для чего он нужен.',
        type: 'multiple_choice',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        moduleId: 3,
        title: 'Action и Reducer',
        description: 'Объясните, что такое Action и Reducer в Redux.',
        type: 'multiple_choice',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        moduleId: 3,
        title: 'Middleware в Redux',
        description: 'Объясните, зачем нужны Middleware и как их использовать.',
        type: 'multiple_choice',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
