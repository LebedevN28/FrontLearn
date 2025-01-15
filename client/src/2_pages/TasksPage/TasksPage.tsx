import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../6_shared/lib/hooks';
import { getTasksByModuleIdThunk } from '../../5_entities/task/model/taskThunk';
import { useNavigate, useParams } from 'react-router-dom';
import TaskCard from '../../4_features/taskCard/TaskCard';
import styles from './TaskPage.module.scss';

function TaskPage(): React.JSX.Element {
  const { moduleId } = useParams<{ moduleId: string }>();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const navigate = useNavigate();

  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (moduleId) {
      dispatch(getTasksByModuleIdThunk(Number(moduleId))).catch((error: unknown) => {
        console.error('Error loading tasks:', error);
      });
    }
  }, [moduleId, dispatch]);

  const handleClick = (taskId: number): void => {
    void navigate(`/task/${String(taskId)}`);
  };

  const filteredTasks = tasks.filter((task) =>
    filter === 'all' ? true : task.difficulty === filter,
  );

  if (!tasks.length) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className={styles.taskPage}>
      <h1>Вопросы по {moduleId}-й Фазе</h1>
      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          Все
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'easy' ? styles.active : ''}`}
          onClick={() => setFilter('easy')}
        >
          Легкие
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'medium' ? styles.active : ''}`}
          onClick={() => setFilter('medium')}
        >
          Средние
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'hard' ? styles.active : ''}`}
          onClick={() => setFilter('hard')}
        >
          Сложные
        </button>
      </div>
      <div className={styles.taskList}>
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default TaskPage;
