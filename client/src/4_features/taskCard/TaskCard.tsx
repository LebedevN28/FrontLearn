import React from 'react';
import type { TaskT } from '../../5_entities/task/model/types';
import styles from './TaskCard.module.scss';

type TaskCardProps = {
  task: TaskT;
  onClick: (taskId: number) => void; // Добавляем обработчик нажатия
  isCompleted: boolean; // Добавляем свойство для отображения галочки при завершенной задаче
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, isCompleted }) => {
  const difficultyClass = styles[task.difficulty];


  return (
    <div className={`${styles.taskCard} ${isCompleted ? styles.completed : ''} ${difficultyClass}`} onClick={() => onClick(task.id)} >
      <div className={styles.iconContainer}>
        {/* Звезда */}
        <span className={styles.starIcon}>★</span>
      </div>
      <button className={styles.startButton} disabled={isCompleted}>НАЧАТЬ</button>
    </div>
  );
};

export default TaskCard;