'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tasks', [
      {
        id: 1,
        title: 'What is React?',
        description: 'Select the correct description of React.',
        type: 'multiple_choice',
        difficulty: 'easy',
        moduleId: 1, // Ссылается на существующий id в Modules
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'What is Redux Toolkit?',
        description: 'Explain the purpose of Redux Toolkit in your own words.',
        type: 'text_input',
        difficulty: 'medium',
        moduleId: 2, // Ссылается на существующий id в Modules
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: 'Explain how React and Redux work together.',
        description: 'Describe how React and Redux interact in a typical React-Redux application.',
        type: 'text_input',
        difficulty: 'hard',
        moduleId: 3, // Ссылается на существующий id в Modules
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
