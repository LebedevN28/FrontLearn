import type { z } from 'zod';
import type { taskFormSchema, taskSchema } from './disabled_task.schema';

// Тип для одной задачи, на основе Zod-схемы
export type TaskType = z.infer<typeof taskSchema>;
export type TaskFormType = z.infer<typeof taskFormSchema>;

// Контекст для управления задачами
export type TasksContextValue = {
  tasks: TaskType[];
  completedTasks: TaskType[];
  addTaskHandler: (formData: TaskFormType) => Promise<void>;
  deleteTaskHandler: (taskId: TaskType['id']) => Promise<void>;
  updateTaskHandler: (taskId: TaskType['id'], data: Partial<TaskType>) => Promise<void>;
};

// Состояние Redux Slice для задач
export type TaskSliceType = {
  tasks: TaskType[];
  selectedTask: TaskType | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  completedTasks: TaskType[];
};

// Действия Redux для управления задачами
export type TaskActionType =
  | {
      type: 'ADD_TASK';
      payload: TaskType;
    }
  | {
      type: 'DELETE_TASK';
      payload: TaskType['id'];
    }
  | {
      type: 'UPDATE_TASK';
      payload: { id: TaskType['id']; data: Partial<TaskType> };
    }
  | {
      type: 'SET_ALL_TASKS';
      payload: TaskType[];
    }
  | {
      type: 'SET_SELECTED_TASK';
      payload: TaskType | null;
    };
