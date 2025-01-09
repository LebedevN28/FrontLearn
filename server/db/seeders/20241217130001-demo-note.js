'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const notes = [
      // Вопросы для категории "Наука"
      {
        title: '100',
        content: 'Что такое гравитация?',
        answer: 'Сила притяжения',
        notebookId: 1,
        userId: 1,
      },
      {
        title: '200',
        content: 'Кто создал теорию относительности?',
        answer: 'Альберт Эйнштейн',
        notebookId: 1,
        userId: 1,
      },
      {
        title: '300',
        content: 'Как называется самая маленькая частица материи?',
        answer: 'Атом',
        notebookId: 1,
        userId: 1,
      },
      {
        title: '400',
        content: 'Что изучает ботаника?',
        answer: 'Растения',
        notebookId: 1,
        userId: 1,
      },
      {
        title: '500',
        content: 'Какой элемент является основным в органической химии?',
        answer: 'Углерод',
        notebookId: 1,
        userId: 1,
      },
      {
        title: '600',
        content: 'Что такое фотосинтез?',
        answer: 'Процесс преобразования света в энергию',
        notebookId: 1,
        userId: 1,
      },

      // Вопросы для категории "История"
      {
        title: '100',
        content: 'Когда была подписана Декларация независимости США?',
        answer: '1776',
        notebookId: 2,
        userId: 1,
      },
      {
        title: '200',
        content: 'Кто был первым президентом России?',
        answer: 'Борис Ельцин',
        notebookId: 2,
        userId: 1,
      },
      {
        title: '300',
        content: 'Когда закончилась Вторая мировая война?',
        answer: '1945',
        notebookId: 2,
        userId: 1,
      },
      {
        title: '400',
        content: 'Какой город был столицей Древнего Египта?',
        answer: 'Фивы',
        notebookId: 2,
        userId: 1,
      },
      {
        title: '500',
        content: 'Кто завоевал половину мира в 4 веке до нашей эры?',
        answer: 'Александр Македонский',
        notebookId: 2,
        userId: 1,
      },
      {
        title: '600',
        content: 'Кто написал "Историю моего времени"?',
        answer: 'Людовик XIV',
        notebookId: 2,
        userId: 1,
      },

      // Вопросы для категории "Искусство"
      {
        title: '100',
        content: 'Кто написал "Мону Лизу"?',
        answer: 'Леонардо да Винчи',
        notebookId: 3,
        userId: 1,
      },
      {
        title: '200',
        content: 'Что означает термин "импрессионизм"?',
        answer: 'Впечатление',
        notebookId: 3,
        userId: 1,
      },
      {
        title: '300',
        content: 'Какой стиль искусства стал популярным в 20 веке?',
        answer: 'Кубизм',
        notebookId: 3,
        userId: 1,
      },
      {
        title: '400',
        content: 'Что такое симфония?',
        answer: 'Музыкальное произведение для оркестра',
        notebookId: 3,
        userId: 1,
      },
      {
        title: '500',
        content: 'Кто является автором "Звездной ночи"?',
        answer: 'Винсент Ван Гог',
        notebookId: 3,
        userId: 1,
      },
      {
        title: '600',
        content: 'Что такое абстрактное искусство?',
        answer: 'Искусство без конкретных форм',
        notebookId: 3,
        userId: 1,
      },

      // Вопросы для категории "Технологии"
      {
        title: '100',
        content: 'Что такое искусственный интеллект?',
        answer: 'Машина, имитирующая человеческий интеллект',
        notebookId: 4,
        userId: 1,
      },
      {
        title: '200',
        content: 'Какой был первый компьютер?',
        answer: 'ENIAC',
        notebookId: 4,
        userId: 1,
      },
      {
        title: '300',
        content: 'Кто изобрел телефон?',
        answer: 'Александр Белл',
        notebookId: 4,
        userId: 1,
      },
      {
        title: '400',
        content: 'Что изучает криптография?',
        answer: 'Шифрование данных',
        notebookId: 4,
        userId: 1,
      },
      {
        title: '500',
        content: 'Что такое алгоритм?',
        answer: 'Последовательность шагов для решения задачи',
        notebookId: 4,
        userId: 1,
      },
      {
        title: '600',
        content: 'Какой язык программирования был первым?',
        answer: 'Fortran',
        notebookId: 4,
        userId: 1,
      },

      // Вопросы для категории "Литература"
      {
        title: '100',
        content: 'Кто написал "Войну и мир"?',
        answer: 'Лев Толстой',
        notebookId: 5,
        userId: 1,
      },
      {
        title: '200',
        content: 'Что такое роман?',
        answer: 'Большое повествовательное произведение',
        notebookId: 5,
        userId: 1,
      },
      {
        title: '300',
        content: 'Какая книга является самой продаваемой в мире?',
        answer: 'Библия',
        notebookId: 5,
        userId: 1,
      },
      {
        title: '400',
        content: 'Кто написал "Маленького принца"?',
        answer: 'Антуан де Сент-Экзюпери',
        notebookId: 5,
        userId: 1,
      },
      {
        title: '500',
        content: 'Как называется первая книга Джоан Роулинг?',
        answer: 'Гарри Поттер и философский камень',
        notebookId: 5,
        userId: 1,
      },
      {
        title: '600',
        content: 'Что такое литература?',
        answer: 'Искусство слова',
        notebookId: 5,
        userId: 1,
      },

      // Вопросы для категории "География"
      {
        title: '100',
        content: 'Какой океан самый глубокий?',
        answer: 'Тихий',
        notebookId: 6,
        userId: 1,
      },
      {
        title: '200',
        content: 'Какая самая длинная река в мире?',
        answer: 'Амазонка',
        notebookId: 6,
        userId: 1,
      },
      {
        title: '300',
        content: 'Какая страна самая большая по территории?',
        answer: 'Россия',
        notebookId: 6,
        userId: 1,
      },
      {
        title: '400',
        content: 'Где находится гора Эверест?',
        answer: 'Гималаи',
        notebookId: 6,
        userId: 1,
      },
      {
        title: '500',
        content: 'Какая пустыня самая большая?',
        answer: 'Сахара',
        notebookId: 6,
        userId: 1,
      },
      {
        title: '600',
        content: 'Как называется столица Австралии?',
        answer: 'Канберра',
        notebookId: 6,
        userId: 1,
      },
    ].map((note) => ({
      ...note,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Notes', notes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notes', null, {});
  },
};
