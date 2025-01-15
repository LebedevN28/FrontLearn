import React from 'react';
import type { TaskT } from '../../5_entities/task/model/types';
import styles from './TaskCard.module.scss';

type TaskCardProps = {
  task: TaskT;
  onClick: (taskId: number) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const difficultyClass = styles[task.difficulty];

  return (
    <div className={`${styles.taskCard} ${difficultyClass}`} onClick={() => onClick(task.id)}>
      <div className={styles.iconContainer}>
        {/* Звезда */}
        <span className={styles.starIcon}>★</span>
      </div>
      <button className={styles.startButton}>НАЧАТЬ</button>
    </div>
  );
};

export default TaskCard;