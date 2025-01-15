import React from 'react';
import type { TaskT } from '../../5_entities/task/model/types';
import styles from './TaskCard.module.css'; // Импортируем стили

type TaskCardProps = {
  task: TaskT;
  onClick: (taskId: number) => void; // Добавляем обработчик нажатия
  isCompleted: boolean; // Добавляем свойство для отображения галочки при завершенной задаче
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, isCompleted }) => {
 // Определяем путь к изображению на основе сложности задачи
 const imagePath = (() => {
  switch (task.difficulty) {
    case 'easy':
      return '/imgs/blueberry.jpg'; // Картинка для легких задач
    case 'medium':
      return '/imgs/raspberry.png'; // Картинка для задач средней сложности
    case 'hard':
      return '/imgs/strawberry.jpg'; // Картинка для сложных задач
    default:
      return '/imgs/goosberry.jpg'; // Картинка по умолчанию
  }
})();

  return (
    <div className={`${styles.taskCard} ${isCompleted ? styles.completed : ''}`}>
      <button onClick={() => onClick(task.id)} disabled={isCompleted}>
        <img src={imagePath} alt="Task" className={styles.taskImage} />
      </button>
      <h3>{task.title}</h3>
      {/* <p>{task.description}</p> */}
      <p>
        <strong>Сложность:</strong> {task.difficulty}
      </p>
    </div>
  );
};

export default TaskCard;
