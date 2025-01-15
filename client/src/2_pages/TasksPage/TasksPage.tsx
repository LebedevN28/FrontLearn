import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../6_shared/lib/hooks';
import { getTasksByModuleIdThunk } from '../../5_entities/task/model/taskThunk';
import { useNavigate, useParams } from 'react-router-dom';
import TaskCard from '../../4_features/taskCard/TaskCard';
import styles from './TaskPage.module.css';

function TaskPage(): React.JSX.Element {
  const { moduleId } = useParams<{ moduleId: string }>();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const navigate = useNavigate();

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

  console.log(difficulty);

  useEffect(() => {
    if (moduleId) {
      dispatch(getTasksByModuleIdThunk({ moduleId: Number(moduleId), difficulty })).catch(
        (error: unknown) => {
          console.error('Error loading tasks:', error);
        },
      );
    }
  }, [moduleId, difficulty, dispatch]);

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
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default TaskPage;
