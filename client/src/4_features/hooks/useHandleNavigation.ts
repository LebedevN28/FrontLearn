// hooks/useHandleNavigation.ts
import { useNavigate } from 'react-router-dom';
import type { TaskT } from '../../5_entities/task/model/types';

export const useHandleNavigation = (tasks: TaskT[], currentTask: TaskT | null): (() => void) => {
  const navigate = useNavigate();

  const handleNextTask = () => {
    const currentIndex = tasks.findIndex((t) => t.id === currentTask?.id);
    const nextTask = tasks[currentIndex + 1];

    if (nextTask) {
      navigate(`/task/${String(nextTask.id)}`);
    } else {
      navigate(`/tasks/${String(currentTask?.moduleId)}`);
    }
  };

  return handleNextTask;
};
