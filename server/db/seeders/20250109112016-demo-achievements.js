'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Achievements', [
      // Уровневые достижения
      {
        id: 1,
        title: 'Достижение 3 уровня ',
        description: 'Вы достигли 3-го уровня. Теперь магия на уровне! 🧙‍♂️',
        type: 'level',
        criteria: '3',
        points: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'Достижение 5 уровня ',
        description: 'Вы достигли 5-го уровня. Пять — это уже много! ✨',
        type: 'level',
        criteria: '5',
        points: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: 'Мастер 10 уровня ',
        description: 'Вы достигли 10-го уровня. Вау, вы мастер! 🙌',
        type: 'level',
        criteria: '10',
        points: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Ответы на вопросы
      {
        id: 4,
        title: 'Первый ответ',
        description: 'Ответили на первый вопрос. Как первый поцелуй, только полезно! 💋',
        type: 'answers',
        criteria: '1',
        points: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        title: 'Профи из 10 ответов',
        description: 'Ответили на 10 вопросов. Теперь вы — эксперт! 🧠',
        type: 'answers',
        criteria: '10',
        points: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        title: 'Гуру из 100 ответов',
        description: 'Ответили на 100 вопросов. Настоящий мудрец! 🧘‍♂️',
        type: 'answers',
        criteria: '100',
        points: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Общий прогресс
      {
        id: 10,
        title: 'Преданность делу',
        description: 'Ответили на 500 вопросов. Герой среди вопросов! 🏅',
        type: 'answers',
        criteria: '500',
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
