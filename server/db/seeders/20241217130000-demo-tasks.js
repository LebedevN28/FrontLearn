'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tasks', [
      // Модуль 1: Основы JavaScript
      // Easy
      {
        id: 1,
        moduleId: 1,
        title: 'Что такое переменная?',
        description:
          'Переменная — это именованный контейнер для хранения данных. Она позволяет хранить, изменять и извлекать информацию в процессе выполнения программы. Для объявления переменной в JavaScript используются ключевые слова var, let или const.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        moduleId: 1,
        title: 'Какие есть типы данных?',
        description:
          'Основные типы данных в JavaScript включают примитивные типы, такие как Number, String, Boolean, Null, Undefined, Symbol, а также Object, который может включать массивы, функции и другие структуры данных.',
        type: 'multiple_choice',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        moduleId: 1,
        title: 'Какое значение имеет `undefined`?',
        description:
          '`undefined` обозначает, что переменная была объявлена, но ей не было присвоено значение. Это одно из примитивных значений в JavaScript.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Medium
      {
        id: 4,
        moduleId: 1,
        title: 'Что такое замыкание?',
        description:
          'Замыкание — это функция, которая "запоминает" переменные из области видимости, в которой она была создана, даже после завершения выполнения этой области. Это позволяет создавать приватные переменные и функции.',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        moduleId: 1,
        title: 'Как работают функции высшего порядка?',
        description:
          'Функция высшего порядка — это функция, которая может принимать другие функции в качестве аргументов или возвращать функцию как результат. Они широко используются в JavaScript для работы с массивами и асинхронным кодом.',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        moduleId: 1,
        title: 'Объясните разницу между `var`, `let` и `const`.',
        description:
          '`var` имеет функциональную область видимости, `let` и `const` имеют блочную область видимости. `const` используется для создания неизменяемых переменных.',
        type: 'multiple_choice',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Hard
      {
        id: 7,
        moduleId: 1,
        title: 'Что такое "каррирование"?',
        description:
          'Каррирование — это техника трансформации функции с несколькими аргументами в последовательность функций, каждая из которых принимает один аргумент. Это полезно для создания специализированных функций.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        moduleId: 1,
        title: 'Как работает Event Loop?',
        description:
          'Event Loop — это механизм в JavaScript, который обрабатывает асинхронные операции, такие как таймеры и сетевые запросы. Он позволяет JavaScript оставаться однопоточным, обрабатывая задачи из очереди событий.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        moduleId: 1,
        title: 'Что такое прототипное наследование?',
        description:
          'Прототипное наследование — это механизм, который позволяет объектам наследовать свойства и методы от других объектов. Это достигается через цепочку прототипов.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Модуль 2: Основы React
      // Easy
      {
        id: 10,
        moduleId: 2,
        title: 'Что такое JSX?',
        description:
          'JSX (JavaScript XML) — это синтаксический сахар для JavaScript, который позволяет писать HTML-подобный код в файлах JavaScript. Он используется для описания структуры интерфейса React-приложений. Например, <h1>Hello, world!</h1> преобразуется в вызов React.createElement, создающий виртуальный DOM.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        moduleId: 2,
        title: 'Как создать компонент?',
        description:
          'Компонент в React — это функция или класс, который возвращает элементы React. Компоненты позволяют разбивать интерфейс на независимые, повторно используемые части. Например, функциональный компонент: function MyComponent() { return <div>Hello, World!</div>; }. Это удобный способ для управления и повторного использования кода.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        moduleId: 2,
        title: 'Что такое Props?',
        description:
          'Props (сокращение от "properties") — это способ передачи данных от родительского компонента к дочернему. Они передаются как атрибуты HTML. Например: <MyComponent name="John" />. Внутри MyComponent можно получить значение name через props.name. Props делают компоненты более гибкими и динамичными.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Medium
      {
        id: 13,
        moduleId: 2,
        title: 'Как работает `useState`?',
        description:
          '`useState` — это хук для управления состоянием в функциональных компонентах. Он возвращает пару: текущее значение состояния и функцию для его обновления. Пример: const [count, setCount] = useState(0);. Вызывая setCount(newValue), вы обновляете значение count и вызываете повторный рендер компонента.',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        moduleId: 2,
        title: 'Что такое `useEffect`?',
        description:
          '`useEffect` — это хук для выполнения побочных эффектов в функциональных компонентах, например, загрузки данных или подписок. Он принимает функцию и массив зависимостей. Если зависимости изменяются, функция вызывается снова. Пример: useEffect(() => { console.log("Mounted"); }, []);.',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        moduleId: 2,
        title: 'Как передавать события?',
        description:
          'События в React обрабатываются с использованием атрибутов, таких как onClick, onChange и т.д. Они принимают функции-обработчики. Например: <button onClick={() => alert("Clicked!")}>Click Me</button>. События работают аналогично стандартным DOM-событиям, но имеют синтетическую обертку для кроссбраузерной совместимости.',
        type: 'multiple_choice',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Hard
      {
        id: 16,
        moduleId: 2,
        title: 'Что такое "виртуальный DOM"?',
        description:
          'Виртуальный DOM — это легковесное представление реального DOM в памяти. При изменении состояния React создает новое виртуальное дерево, сравнивает его с предыдущей версией (diffing), и только измененные части обновляются в реальном DOM. Это ускоряет рендеринг и минимизирует манипуляции с DOM.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        moduleId: 2,
        title: 'Как работает Context API?',
        description:
          'Context API предоставляет способ передачи данных через дерево компонентов без необходимости вручную передавать props на каждом уровне. Например, с помощью React.createContext и React.useContext можно создать контекст и получить доступ к его значениям. Это особенно полезно для тем, настроек или авторизации.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        moduleId: 2,
        title: 'Что такое фрагменты?',
        description:
          'React.Fragment позволяет группировать несколько элементов без добавления дополнительного DOM-узла. Это полезно, когда нужно вернуть несколько элементов из компонента, не нарушая структуру DOM. Пример: <React.Fragment><div /><span /></React.Fragment> или просто <>...</>.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Модуль 3: Работа с Redux
      // Easy
      {
        id: 19,
        moduleId: 3,
        title: 'Что такое Redux?',
        description:
          'Redux — это библиотека для управления состоянием приложения. Она помогает централизовать состояние в одном месте (store) и передавать его в любые компоненты. Redux используется, чтобы избежать "пробрасывания" props через несколько уровней компонентов и облегчить управление состоянием в масштабных приложениях.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        moduleId: 3,
        title: 'Как работает Store?',
        description:
          'Store в Redux — это объект, который содержит состояние приложения и предоставляет методы для его обновления. Store создается с помощью функции createStore(reducer). Для изменения состояния используются actions, а для подписки на изменения — store.subscribe().',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 21,
        moduleId: 3,
        title: 'Что такое Action?',
        description:
          'Action в Redux — это простой объект, описывающий, какое изменение должно произойти в состоянии. У Action всегда есть свойство type (строка), а также может быть полезная нагрузка (payload). Пример: { type: "ADD_TODO", payload: { text: "Learn Redux" } }.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 22,
        moduleId: 3,
        title: 'Что делает Reducer?',
        description:
          'Reducer — это чистая функция, которая принимает текущее состояние и Action, а затем возвращает новое состояние. Reducer описывает, как состояние должно изменяться в ответ на определенные действия. Пример: function reducer(state, action) { if (action.type === "INCREMENT") return { count: state.count + 1 }; return state; }.',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 23,
        moduleId: 3,
        title: 'Как подключить Redux к React?',
        description:
          'Для интеграции Redux с React используется библиотека react-redux. Она предоставляет компонент <Provider>, оборачивающий приложение, и хук useSelector для доступа к состоянию и useDispatch для отправки действий. Пример: <Provider store={store}><App /></Provider>.',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 24,
        moduleId: 3,
        title: 'Как работают Middleware?',
        description:
          'Middleware в Redux — это функция, которая обрабатывает действия перед тем, как они попадут в Reducer. Они используются для асинхронных операций, логирования или обработки побочных эффектов. Middleware подключаются через applyMiddleware. Пример: const logger = (store) => (next) => (action) => { console.log(action); next(action); }.',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 25,
        moduleId: 3,
        title: 'Что такое Thunk?',
        description:
          'Redux Thunk — это middleware, который позволяет Action возвращать функции вместо объектов. Эти функции могут выполнять асинхронные операции, а затем диспатчить другие действия. Пример: const fetchTodos = () => (dispatch) => { fetch("/api/todos").then((response) => response.json()).then((data) => dispatch({ type: "SET_TODOS", payload: data })); }.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 26,
        moduleId: 3,
        title: 'Как реализовать асинхронные действия?',
        description:
          'Асинхронные действия в Redux реализуются через middleware, такие как Redux Thunk или Redux Saga. Например, с Redux Thunk можно писать функции, которые выполняют запросы и затем вызывают диспатчи для обновления состояния. Это позволяет разделить логику данных и интерфейса.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 27,
        moduleId: 3,
        title: 'Что такое Redux Toolkit?',
        description:
          'Redux Toolkit — это библиотека, упрощающая работу с Redux. Она включает утилиты для создания reducer-ов (createSlice), асинхронных операций (createAsyncThunk) и настройки store. Это уменьшает количество шаблонного кода и упрощает разработку. Пример: const slice = createSlice({ name: "todos", initialState: [], reducers: { addTodo: (state, action) => { state.push(action.payload); } } });.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 28,
        moduleId: 1,
        title: 'Что такое "use strict"?',
        description:
          '"use strict" — это директива, которая включает строгий режим в JavaScript. В строгом режиме запрещаются некоторые небезопасные действия, такие как использование необъявленных переменных или дублирование параметров функций. Это помогает писать более безопасный и предсказуемый код.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 29,
        moduleId: 1,
        title: 'Как объявить массив?',
        description:
          'Массивы в JavaScript объявляются с помощью квадратных скобок []. Например: const array = [1, 2, 3]. Массивы могут содержать элементы разных типов данных, включая числа, строки, объекты и даже другие массивы. Методы массивов, такие как push(), pop(), map() и filter(), делают их очень удобными для работы с коллекциями данных.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 30,
        moduleId: 1,
        title: 'Какой тип данных возвращает typeof null?',
        description:
          'typeof null возвращает "object". Это историческая ошибка в JavaScript, оставшаяся из-за обратной совместимости. null сам по себе является примитивным типом данных, представляющим "ничего" или "пустое значение". Однако typeof интерпретирует его как объект из-за особенностей внутреннего устройства JavaScript.',
        type: 'multiple_choice',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 31,
        moduleId: 1,
        title: 'Что такое глубокое клонирование объектов?',
        description:
          'Глубокое клонирование создает полную копию объекта, включая вложенные объекты и массивы. Для этого можно использовать JSON.parse(JSON.stringify(obj)), но это имеет ограничения (например, не поддерживаются функции и специальные объекты). Более надежный способ — использовать библиотеки вроде Lodash (метод cloneDeep).',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 32,
        moduleId: 1,
        title: 'Как работает деструктуризация?',
        description:
          'Деструктуризация позволяет извлекать значения из массивов или объектов и присваивать их переменным. Для массивов: const [a, b] = [1, 2]. Для объектов: const { key1, key2 } = { key1: "value1", key2: "value2" }. Это упрощает доступ к данным и делает код чище.',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 33,
        moduleId: 1,
        title: 'Как работает метод Array.map()?',
        description:
          'Метод Array.map() создает новый массив, применяя функцию к каждому элементу исходного массива. Пример: const numbers = [1, 2, 3]; const squares = numbers.map(x => x * x);. В данном примере squares будет равен [1, 4, 9]. Исходный массив не изменяется.',
        type: 'multiple_choice',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 34,
        moduleId: 1,
        title: 'Как работает объект Proxy?',
        description:
          'Proxy в JavaScript позволяет перехватывать и настраивать базовые операции объекта, такие как чтение, запись, вызов функций и т.д. Пример: const proxy = new Proxy(target, handler);, где target — объект, а handler — объект с ловушками (методами), например, get, set. Это полезно для логирования, валидации и других задач.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 35,
        moduleId: 1,
        title: 'Что такое генераторы?',
        description:
          'Генераторы — это функции, которые могут приостанавливать выполнение и возобновлять его позже. Они объявляются с помощью function*. Внутри генераторов используется ключевое слово yield для возврата промежуточных значений. Пример: function* gen() { yield 1; yield 2; }.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 36,
        moduleId: 1,
        title: 'Как работает "this" в стрелочных функциях?',
        description:
          'В стрелочных функциях значение this определяется в момент создания функции и совпадает с контекстом родительской области. Это отличие от обычных функций, где this зависит от того, как функция вызывается. Пример: const obj = { method: () => console.log(this) };. Здесь this будет глобальным объектом или undefined в strict mode.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 37,
        moduleId: 2,
        title: 'Что такое React.Fragment?',
        description:
          'React.Fragment — это компонент, который позволяет группировать дочерние элементы без добавления дополнительных узлов в DOM. Это полезно, чтобы избежать лишней вложенности. Пример: <React.Fragment><Child1 /><Child2 /></React.Fragment>, или <><Child1 /><Child2 /></> с использованием сокращенной записи.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 38,
        moduleId: 2,
        title: 'Что такое "key" в списках React?',
        description:
          'Key — это специальный атрибут, используемый для идентификации элементов в списке. React использует key, чтобы определить, какие элементы были добавлены, удалены или изменены. Пример: items.map((item) => <li key={item.id}>{item.name}</li>). Уникальные ключи помогают оптимизировать рендеринг.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 39,
        moduleId: 2,
        title: 'Как задать обработчик событий в React?',
        description:
          'В React обработчики событий добавляются как свойства элемента. Пример: <button onClick={handleClick}>Click me</button>. Функция handleClick будет вызвана при нажатии на кнопку. Важно использовать стрелочные функции или привязку для сохранения контекста this.',
        type: 'multiple_choice',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 40,
        moduleId: 2,
        title: 'Как использовать `useReducer`?',
        description:
          'useReducer — это хук для управления сложным состоянием. Он похож на Redux, но встроен в React. Пример: const [state, dispatch] = useReducer(reducer, initialState). Reducer — это функция, принимающая текущее состояние и действие, а возвращающая новое состояние.',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 41,
        moduleId: 2,
        title: 'Как работают мемоизированные компоненты?',
        description:
          'React.memo предотвращает повторный рендер компонента, если его props не изменились. Это улучшает производительность. Пример: const MemoizedComponent = React.memo(Component). Однако важно помнить, что это работает только для функциональных компонентов.',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 42,
        moduleId: 2,
        title: 'Что такое StrictMode?',
        description:
          'StrictMode — это инструмент для выявления потенциальных проблем в приложении. Он активирует дополнительные проверки и предупреждения в режиме разработки. StrictMode не влияет на поведение в продакшене и оборачивает компоненты в вашем приложении, например: <React.StrictMode><App /></React.StrictMode>.',
        type: 'multiple_choice',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Hard
      {
        id: 43,
        moduleId: 2,
        title: 'Как работает рендеринг на сервере (SSR)?',
        description:
          'Рендеринг на сервере (SSR) позволяет создавать HTML-страницы на сервере, а не на клиенте. Это улучшает время загрузки и SEO. React предоставляет для этого метод renderToString(). Например, Next.js — это популярный фреймворк для реализации SSR с React. HTML рендерится на сервере, а на клиенте React "гидратирует" его для добавления интерактивности.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 44,
        moduleId: 2,
        title: 'Что такое Hydration?',
        description:
          'Hydration — это процесс связывания рендеренного на сервере HTML с функциональностью React на клиенте. После загрузки React "гидратирует" серверный HTML, добавляя ему интерактивность. Это используется в рендеринге на сервере (SSR) для оптимизации производительности и улучшения SEO.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 45,
        moduleId: 2,
        title: 'Как работает Concurrent Mode?',
        description:
          'Concurrent Mode — это экспериментальный режим в React, предназначенный для повышения производительности. Он позволяет React прерывать рендеринг и отдавать приоритет более важным задачам, таким как отклик на пользовательские действия. Это делается с использованием функций вроде Suspense и startTransition. Concurrent Mode ещё не полностью стабилен.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 46,
        moduleId: 3,
        title: 'Что такое Redux DevTools?',
        description:
          'Redux DevTools — это инструмент для отладки приложений, использующих Redux. Он позволяет просматривать действия, состояние и историю изменений в приложении. Для использования необходимо установить расширение браузера и настроить DevTools в Store. Пример: composeWithDevTools(applyMiddleware(...middlewares)).',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 47,
        moduleId: 3,
        title: 'Как обновляется состояние в Redux?',
        description:
          'В Redux состояние обновляется через Actions и Reducers. Action описывает, что должно быть сделано (например, { type: "INCREMENT" }), а Reducer определяет, как состояние должно измениться. Состояние в Redux неизменно, поэтому всегда создаётся новый объект состояния.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 48,
        moduleId: 3,
        title: 'Что такое Selector?',
        description:
          'Selector — это функция для извлечения части состояния из Store. Он позволяет изолировать логику выборки данных, что упрощает тестирование и улучшает читаемость кода. Пример: const getUserName = (state) => state.user.name;. Используйте библиотеку reselect для создания мемоизированных селекторов.',
        type: 'multiple_choice',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 49,
        moduleId: 3,
        title: 'Как работает Redux Toolkit?',
        description:
          'Redux Toolkit предоставляет упрощённый способ работы с Redux, включающий настраиваемый Store, Slices и Thunks. Пример: createSlice({ name: "counter", initialState, reducers: { increment(state) { state.value += 1; } } }). Это уменьшает количество шаблонного кода и упрощает настройку Redux.',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 50,
        moduleId: 3,
        title: 'Что такое Slice в Redux Toolkit?',
        description:
          'Slice — это часть состояния Redux и логики его обработки. Используйте createSlice для создания Slices, которые содержат initialState, Reducers и Actions. Пример: const counterSlice = createSlice({ name: "counter", initialState, reducers: { increment(state) { state.value++; } } }). Это упрощает работу с Redux.',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 51,
        moduleId: 3,
        title: 'Как работает `createAsyncThunk`?',
        description:
          'createAsyncThunk используется для обработки асинхронных операций, таких как запросы на сервер. Он автоматически создаёт Actions для состояний pending, fulfilled и rejected. Пример: const fetchUser = createAsyncThunk("users/fetch", async (id) => { const response = await fetch(`/api/users/${id}`); return response.json(); }). Это упрощает управление асинхронным состоянием.',
        type: 'multiple_choice',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 52,
        moduleId: 3,
        title: 'Что такое reselect?',
        description:
          'Reselect — это библиотека для создания мемоизированных селекторов в Redux. Она улучшает производительность, предотвращая избыточные вычисления. Пример: const getCompletedTodos = createSelector([state => state.todos], todos => todos.filter(todo => todo.completed));. Это полезно при работе с большими состояниями.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 53,
        moduleId: 3,
        title: 'Как настроить кастомные Middleware?',
        description:
          'Middleware — это функции, которые перехватывают действия между их отправкой и обработкой редьюсером. Пример: const loggerMiddleware = (store) => (next) => (action) => { console.log(action); return next(action); }. Middleware добавляются в Store с помощью applyMiddleware.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 54,
        moduleId: 3,
        title: 'Как оптимизировать производительность Redux?',
        description:
          'Для оптимизации Redux используйте мемоизированные селекторы (reselect), избегайте избыточных обновлений состояния и минимизируйте использование глобального состояния. Например, не сохраняйте временные данные в Store. Разделяйте сложное состояние на Slices с использованием Redux Toolkit.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 55,
        moduleId: 1,
        title: 'Как объявить функцию?',
        description:
          'Функции в JavaScript можно объявлять несколькими способами: Function Declaration (function myFunc() { ... }), Function Expression (const myFunc = function() { ... }), и Arrow Function (const myFunc = () => { ... }). Каждая из них имеет свои особенности в отношении контекста this и области видимости.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 56,
        moduleId: 1,
        title: 'Что такое "console.log"?',
        description:
          'console.log — это метод объекта console, который используется для вывода сообщений в консоль. Он полезен для отладки кода и проверки значений переменных. Пример: console.log("Привет, мир!").',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 57,
        moduleId: 1,
        title: 'Как создать объект?',
        description:
          'Объект в JavaScript можно создать несколькими способами: с использованием литерала объекта (const obj = { key: "value" }), конструктора Object (const obj = new Object()) или с использованием классов (class MyClass { constructor() { this.key = "value"; } }). Объекты используются для хранения пар ключ-значение.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Medium
      {
        id: 58,
        moduleId: 1,
        title: 'Как работает "for...of"?',
        description:
          '"for...of" используется для итерации по итерируемым объектам, включая массивы, строки, Map, Set и другие. Например: \n\nconst array = [1, 2, 3]; \nfor (const item of array) { \n   console.log(item); \n} \nЭтот цикл автоматически предоставляет значения, а не индексы, что делает его удобным для работы с коллекциями.',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 59,
        moduleId: 1,
        title: 'Что такое промисы?',
        description:
          'Промисы — это объект в JavaScript, представляющий результат асинхронной операции. Пример: \n\nconst promise = new Promise((resolve, reject) => { \n   if (success) { \n      resolve("Успешно"); \n   } else { \n      reject("Ошибка"); \n   } \n}); \nПромисы позволяют работать с асинхронным кодом и избегать вложенных коллбэков ("callback hell").',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 60,
        moduleId: 1,
        title: 'Как работает async/await?',
        description:
          'async/await предоставляет упрощённый способ работы с промисами. Ключевое слово "async" используется для обозначения асинхронной функции, а "await" позволяет ждать завершения промиса. Пример: \n\nasync function fetchData() { \n   try { \n      const response = await fetch("/api/data"); \n      const data = await response.json(); \n      console.log(data); \n   } catch (error) { \n      console.error(error); \n   } \n}',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 61,
        moduleId: 1,
        title: 'Что такое модульная система в JavaScript?',
        description:
          'Модульная система позволяет разделять код на небольшие части, называемые модулями. ES6 ввёл встроенную поддержку модулей с помощью export и import. Пример: \n\n// module.js \nexport const greeting = "Привет"; \n// main.js \nimport { greeting } from "./module.js"; \nconsole.log(greeting); \nМодули помогают организовать код и избежать глобального пространства имён.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 62,
        moduleId: 1,
        title: 'Как работает "debounce"?',
        description:
          'Debounce — это техника ограничения частоты вызовов функции. Она используется, чтобы избежать слишком частых операций, таких как обработка событий ввода. Пример: \n\nfunction debounce(func, delay) { \n   let timeout; \n   return (...args) => { \n      clearTimeout(timeout); \n      timeout = setTimeout(() => func(...args), delay); \n   }; \n} \nconst debouncedFunc = debounce(() => console.log("Вызов!"), 300);',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 63,
        moduleId: 1,
        title: 'Что такое "Symbol"?',
        description:
          'Symbol — это уникальный примитивный тип данных, добавленный в ES6. Символы используются для создания уникальных идентификаторов. Пример: \n\nconst sym = Symbol("описание"); \nconsole.log(typeof sym); // "symbol" \nОни часто применяются для задания ключей объектов, чтобы избежать конфликтов с другими свойствами.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 64,
        moduleId: 2,
        title: 'Какой базовый компонент в React?',
        description:
          'Базовый компонент в React может быть функциональным или классовым. Пример функционального компонента: \n\nfunction Welcome(props) { \n   return <h1>Привет, {props.name}!</h1>; \n} \nКомпоненты позволяют разбивать пользовательский интерфейс на независимые части.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 65,
        moduleId: 2,
        title: 'Что такое состояние компонента?',
        description:
          'Состояние (state) — это объект, который хранит динамические данные компонента. Пример использования состояния с хуком useState: \n\nfunction Counter() { \n   const [count, setCount] = useState(0); \n   return <button onClick={() => setCount(count + 1)}>Счётчик: {count}</button>; \n} \nState позволяет управлять состоянием пользовательского интерфейса.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 66,
        moduleId: 2,
        title: 'Как рендерить список?',
        description:
          'Списки в React рендерятся с использованием метода map(). Каждый элемент списка должен иметь уникальный ключ (key). Пример: \n\nconst items = ["Яблоко", "Банан", "Апельсин"]; \n<ul> \n   {items.map((item, index) => <li key={index}>{item}</li>)} \n</ul>; \nКлючи помогают React оптимизировать обновление списка.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 67,
        moduleId: 2,
        title: 'Как использовать "useContext"?',
        description:
          'useContext — это хук, позволяющий использовать контекст в функциональных компонентах. Пример: \n\nconst ThemeContext = React.createContext("светлая"); \nfunction App() { \n   const theme = useContext(ThemeContext); \n   return <div className={theme}>Текущая тема: {theme}</div>; \n} \nuseContext упрощает доступ к данным контекста без необходимости использовать HOC или render props.',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 68,
        moduleId: 2,
        title: 'Что такое HOC (Higher Order Component)?',
        description:
          'HOC (Higher Order Component) — это функция, которая принимает компонент и возвращает новый компонент с дополнительной функциональностью. Пример: \n\nfunction withLogging(WrappedComponent) { \n   return function EnhancedComponent(props) { \n      console.log("Рендеринг компонента"); \n      return <WrappedComponent {...props} />; \n   }; \n} \nHOC используется для повторного использования логики между компонентами.',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 69,
        moduleId: 2,
        title: 'Как обновить state?',
        description:
          'State обновляется с помощью функции setState в классовых компонентах или хука useState в функциональных. Пример: \n\nfunction Counter() { \n   const [count, setCount] = useState(0); \n   return <button onClick={() => setCount(count + 1)}>Счётчик: {count}</button>; \n} \nОбновление состояния вызывает повторный рендер компонента.',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 70,
        moduleId: 2,
        title: 'Как работает React Reconciliation?',
        description:
          'Reconciliation — это процесс обновления виртуального DOM и синхронизации его с реальным DOM. React сравнивает текущее дерево виртуального DOM с предыдущим (diffing) и применяет минимальное количество изменений. Это повышает производительность и делает обновления UI более эффективными.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 71,
        moduleId: 2,
        title: 'Что такое Error Boundaries?',
        description:
          'Error Boundaries — это React-компоненты, которые обрабатывают ошибки в их дочерних компонентах. Они предотвращают крах всего приложения. Пример: \n\nclass ErrorBoundary extends React.Component { \n   state = { hasError: false }; \n\n   static getDerivedStateFromError() { \n      return { hasError: true }; \n   } \n\n   componentDidCatch(error, info) { \n      console.error("Ошибка:", error, info); \n   } \n\n   render() { \n      return this.state.hasError ? <h1>Что-то пошло не так</h1> : this.props.children; \n   } \n}',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 72,
        moduleId: 2,
        title: 'Как работает Suspense?',
        description:
          'Suspense — это компонент, который позволяет "ожидать" завершения асинхронных операций (например, загрузки данных). Он используется вместе с React.lazy для динамической загрузки компонентов. Пример: \n\nconst LazyComponent = React.lazy(() => import("./LazyComponent")); \n\nfunction App() { \n   return ( \n      <Suspense fallback={<div>Загрузка...</div>}> \n         <LazyComponent /> \n      </Suspense> \n   ); \n}',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 73,
        moduleId: 3,
        title: 'Что такое Action Creator?',
        description:
          'Action Creator — это функция, которая создаёт объект действия (action) в Redux. Пример: \n\nfunction increment() { \n   return { type: "INCREMENT" }; \n} \nAction Creators помогают избежать дублирования кода при создании объектов действий.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 74,
        moduleId: 3,
        title: 'Что такое начальное состояние в Redux?',
        description:
          'Начальное состояние в Redux — это объект, который задаётся в Reducer. Пример: \n\nconst initialState = { count: 0 }; \nfunction reducer(state = initialState, action) { \n   switch (action.type) { \n      case "INCREMENT": \n         return { count: state.count + 1 }; \n      default: \n         return state; \n   } \n}',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 75,
        moduleId: 3,
        title: 'Как подписаться на изменения Store?',
        description:
          'Подписка на изменения Store выполняется с помощью метода subscribe. Пример: \n\nstore.subscribe(() => { \n   console.log("Текущее состояние:", store.getState()); \n}); \nЭтот метод вызывается при каждом изменении состояния.',
        type: 'text_input',
        difficulty: 'easy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 76,
        moduleId: 3,
        title: 'Как настроить DevTools для Redux Toolkit?',
        description:
          'Redux Toolkit интегрируется с DevTools автоматически. Достаточно использовать configureStore: \n\nconst store = configureStore({ \n   reducer: rootReducer, \n   devTools: process.env.NODE_ENV !== "production", \n}); \nDevTools помогают отслеживать действия и состояние приложения.',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 77,
        moduleId: 3,
        title: 'Что такое Immer?',
        description:
          'Immer — это библиотека, используемая Redux Toolkit для работы с неизменяемым состоянием. Пример: \n\nconst slice = createSlice({ \n   name: "example", \n   initialState: { count: 0 }, \n   reducers: { \n      increment: (state) => { \n         state.count += 1; \n      }, \n   }, \n}); \nImmer позволяет изменять state "как будто" он изменяемый.',
        type: 'text_input',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 78,
        moduleId: 3,
        title: 'Как объединить несколько Reducer-ов?',
        description:
          'Для объединения нескольких Reducer-ов в Redux используется функция combineReducers. Она создаёт один Reducer из нескольких. Пример: \n\nimport { combineReducers } from "redux"; \n\nconst rootReducer = combineReducers({ \n   user: userReducer, \n   tasks: tasksReducer, \n}); \n\ncombineReducers позволяет разделить логику состояния на отдельные части для удобства и структурированности.',
        type: 'multiple_choice',
        difficulty: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 79,
        moduleId: 3,
        title: 'Как работают динамические Reducer-ы?',
        description:
          'Динамические Reducer-ы позволяют добавлять новые части состояния на лету. Это полезно для модульных приложений. Пример: \n\nstore.asyncReducers = {}; \nfunction addReducer(key, reducer) { \n   store.asyncReducers[key] = reducer; \n   store.replaceReducer(combineReducers(store.asyncReducers)); \n} \nЭтот подход позволяет добавлять функциональность без необходимости перезапуска приложения.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 80,
        moduleId: 3,
        title: 'Что такое Redux Saga?',
        description:
          'Redux Saga — это библиотека для обработки побочных эффектов в Redux. Она использует генераторы для работы с асинхронным кодом. Пример: \n\nfunction* fetchDataSaga(action) { \n   try { \n      const data = yield call(api.fetchData, action.payload); \n      yield put({ type: "FETCH_SUCCESS", payload: data }); \n   } catch (error) { \n      yield put({ type: "FETCH_FAILURE", error }); \n   } \n} \nRedux Saga позволяет легко организовать и контролировать сложные асинхронные потоки.',
        type: 'text_input',
        difficulty: 'hard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 81,
        moduleId: 3,
        title: 'Как реализовать Undo/Redo в Redux?',
        description:
          'Undo/Redo в Redux можно реализовать с помощью сохранения истории изменений состояния. Пример: \n\nfunction undoable(reducer) { \n   const initialState = { past: [], present: reducer(undefined, {}), future: [] }; \n   return (state = initialState, action) => { \n      switch (action.type) { \n         case "UNDO": { \n            const { past, present, future } = state; \n            const previous = past[past.length - 1]; \n            const newPast = past.slice(0, past.length - 1); \n            return { past: newPast, present: previous, future: [present, ...future] }; \n         } \n         case "REDO": { \n            const { past, present, future } = state; \n            const next = future[0]; \n            const newFuture = future.slice(1); \n            return { past: [...past, present], present: next, future: newFuture }; \n         } \n         default: { \n            const newPresent = reducer(state.present, action); \n            if (state.present === newPresent) return state; \n            return { past: [...state.past, state.present], present: newPresent, future: [] }; \n         } \n      } \n   }; \n} \nЭта концепция упрощает откат или повтор операций, используя массивы для хранения истории.',
        type: 'text_input',
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
