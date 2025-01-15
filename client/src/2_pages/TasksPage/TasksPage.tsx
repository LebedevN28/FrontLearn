import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../6_shared/lib/hooks';
import { getTasksByModuleIdThunk } from '../../5_entities/task/model/taskThunk';
import { useNavigate, useParams } from 'react-router-dom';
import TaskCard from '../../4_features/taskCard/TaskCard';

import { getUserProgressByModuleThunk } from '../../5_entities/progress/model/progressThunks';
import styles from './TaskPage.module.scss';

function TaskPage(): React.JSX.Element {
  const { moduleId } = useParams<{ moduleId: string }>();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const navigate = useNavigate();
  const user = useAppSelector((store) => store.user.selectedUser);
  const userProgress = useAppSelector((state) => state.progress.progressModule);

  const [difficulty, setDifficulty] = useState<string>('');

  const handleCheckboxChange = (level: string) => {
    if (level === 'all') {
      setDifficulty('');
      return;
    }
    setDifficulty((prevDifficulty) => {
      if (prevDifficulty.includes(level)) {
        return prevDifficulty.filter((item) => item !== level);
      }
      return level;
    });
  };

  useEffect(() => {
    if (moduleId) {
      const moduleIdNumber = Number(moduleId);

      dispatch(getTasksByModuleIdThunk({moduleId: moduleIdNumber, difficulty})).catch((error: unknown) => {
        console.error('Error loading tasks:', error);
      });
      const userId = user?.id;
      if (userId)
        dispatch(getUserProgressByModuleThunk({ userId, moduleId: moduleIdNumber })).catch(
          console.error,
        );
    }

  }, [moduleId, user?.id, difficulty, dispatch]);

  // Функция для проверки, решена ли задача
  const isTaskCompleted = (taskId: number): boolean =>
    userProgress.some((progress) => progress.Progresses.some((p) => p.taskId === taskId));

  const handleClick = (taskId: number): void => {
    void navigate(`/task/${String(taskId)}`);
  };

  if (!tasks.length) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div>
      <h1>Вопросы по {moduleId}-й Фазе</h1>

      <div className={styles.checkboxContainer}>
        <label>
          <input
            type="checkbox"
            checked={
              difficulty.includes('') &&
              difficulty !== 'easy' &&
              difficulty !== 'medium' &&
              difficulty !== 'hard'
            }
            onChange={() => handleCheckboxChange('all')}
          />
          All
        </label>
        <label>
          <input
            type="checkbox"
            checked={difficulty.includes('easy')}
            onChange={() => handleCheckboxChange('easy')}
          />
          Easy
        </label>
        <label>
          <input
            type="checkbox"
            checked={difficulty.includes('medium')}
            onChange={() => handleCheckboxChange('medium')}
          />
          Medium
        </label>
        <label>
          <input
            type="checkbox"
            checked={difficulty.includes('hard')}
            onChange={() => handleCheckboxChange('hard')}
          />
          Hard
        </label>
      </div>

      <div className={styles.taskList}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={handleClick} isCompleted={isTaskCompleted(task.id)}/>
        ))}
      </div>
    </div>
  );
}

export default TaskPage;
