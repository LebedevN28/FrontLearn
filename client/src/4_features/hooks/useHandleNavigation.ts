// hooks/useHandleNavigation.ts
import { useNavigate } from 'react-router-dom';

export const useHandleNavigation = (tasks: any[], task: any) => {
  const navigate = useNavigate();

  const handleNextTask = () => {
    const currentIndex = tasks.findIndex((t) => t.id === task?.id);
    const nextTask = tasks[currentIndex + 1];

    if (nextTask) {
      navigate(`/task/${String(nextTask.id)}`);
    } else {
      navigate(`/tasks/${String(task?.moduleId)}`);
    }
  };

  return handleNextTask;
};
