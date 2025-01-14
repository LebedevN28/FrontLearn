import React, { useEffect } from 'react';
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

  if (!tasks.length) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div>
      <h1>Вопросы по {moduleId}-й Фазе</h1>
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default TaskPage;
