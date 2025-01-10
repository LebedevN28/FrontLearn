'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Modules', [
      {
        id: 1,
        title: 'React Basics',
        description: 'Introduction to React fundamentals.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'Advanced Redux',
        description: 'Deep dive into Redux Toolkit and middleware.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: 'React-Redux Integration',
        description: 'Learn how to integrate Redux with React applications.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Modules', null, {});
  },
};
