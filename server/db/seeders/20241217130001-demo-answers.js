'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Answers', [
      // Ответы для задачи 1
      {
        id: 1,
        taskId: 1,
        content: 'Переменная — это контейнер для хранения данных.',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        taskId: 1,
        content: 'Переменная — это функция в JavaScript.',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        taskId: 1,
        content: 'Переменная — это объект, созданный автоматически.',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Ответы для задачи 2
      {
        id: 4,
        taskId: 2,
        content: 'Number, String, Boolean, Undefined, Null, Symbol, Object.',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        taskId: 2,
        content: 'Только Number, String и Object.',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        taskId: 2,
        content: 'Array и Function — это основные типы.',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Ответы для задачи 3
      {
        id: 7,
        taskId: 3,
        content:
          'Замыкание — это функция, которая запоминает своё лексическое окружение.',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        taskId: 3,
        content: 'Замыкание — это метод объекта в JavaScript.',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        taskId: 3,
        content: 'Замыкание — это событие в DOM.',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Ответы для задачи 4
      {
        id: 10,
        taskId: 4,
        content: 'JSX — это синтаксический сахар для написания React-компонентов.',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        taskId: 4,
        content: 'JSX — это библиотека для управления состоянием.',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        taskId: 4,
        content: 'JSX — это плагин для Babel.',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Ответы для задачи 5
      {
        id: 13,
        taskId: 5,
        content: 'componentDidMount, componentDidUpdate, componentWillUnmount.',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        taskId: 5,
        content: 'render, constructor, setState.',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        taskId: 5,
        content: 'useState, useEffect, useContext.',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Ответы для задачи 6
      {
        id: 16,
        taskId: 6,
        content: 'Hooks позволяют использовать состояние в функциональных компонентах.',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        taskId: 6,
        content: 'Hooks заменяют Redux полностью.',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        taskId: 6,
        content: 'Hooks используются только в классовых компонентах.',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Ответы для задачи 7
      {
        id: 19,
        taskId: 7,
        content: 'Redux — это библиотека для управления состоянием.',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        taskId: 7,
        content: 'Redux — это библиотека для работы с DOM.',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 21,
        taskId: 7,
        content: 'Redux — это инструмент для написания стилей.',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Ответы для задачи 8
      {
        id: 22,
        taskId: 8,
        content: 'Action — это объект, описывающий, что нужно изменить в состоянии.',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 23,
        taskId: 8,
        content: 'Reducer — это функция, которая изменяет состояние на основе action.',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 24,
        taskId: 8,
        content: 'Action — это компонент в React.',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Ответы для задачи 9
      {
        id: 25,
        taskId: 9,
        content: 'Middleware перехватывает actions перед передачей в reducer.',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 26,
        taskId: 9,
        content: 'Middleware управляет жизненными циклами компонентов.',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 27,
        taskId: 9,
        content: 'Middleware используется для работы с DOM.',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Answers', null, {});
  },
};
