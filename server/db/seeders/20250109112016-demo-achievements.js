'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Achievements', [
      // Уровневые достижения
      {
        id: 1,
        title: 'Level 3 Achiever',
        description: 'Reach level 3.',
        type: 'level',
        criteria: '3', // Упрощенный критерий
        points: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'Level 5 Achiever',
        description: 'Reach level 5.',
        type: 'level',
        criteria: '5', // Упрощенный критерий
        points: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: 'Level 10 Master',
        description: 'Reach level 10.',
        type: 'level',
        criteria: '10', // Упрощенный критерий
        points: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Ответы на вопросы
      {
        id: 4,
        title: 'First Answer',
        description: 'Answer your first question.',
        type: 'answers',
        criteria: '1', // Упрощенный критерий
        points: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        title: '10 Answers Pro',
        description: 'Answer 10 questions.',
        type: 'answers',
        criteria: '10', // Упрощенный критерий
        points: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        title: '100 Answers Guru',
        description: 'Answer 100 questions.',
        type: 'answers',
        criteria: '100', // Упрощенный критерий
        points: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Общий прогресс
      {
        id: 10,
        title: 'Dedication',
        description: 'Answer 500 questions.',
        type: 'answers',
        criteria: '500', // Упрощенный критерий
        points: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Achievements', null, {});
  },
};
