import React from 'react';
import type { TaskT } from '../../5_entities/task/model/types';
import styles from './TaskCard.module.css'; // Импортируем стили

type TaskCardProps = {
  task: TaskT;
  onClick: (taskId: number) => void; // Добавляем обработчик нажатия
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  let imagePath = '';
  switch (task.difficulty) {
    case 'easy':
      imagePath = '/imgs/blueberry.jpg'; // Картинка для легких задач
      break;
    case 'medium':
      imagePath = '/imgs/raspberry.png'; // Картинка для задач средней сложности
      break;
    case 'hard':
      imagePath = '/imgs/strawberry.jpg'; // Картинка для сложных задач
      break;
    default:
      imagePath = '/imgs/goosberry.jpg'; // Картинка по умолчанию
      break;
  }

  return (
    <div className={styles.taskCard}>
      <button onClick={() => onClick(task.id)}>
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
