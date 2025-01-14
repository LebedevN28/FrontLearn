import type { z } from 'zod';
import type { taskSchema } from './schema';

export type TaskT = z.infer<typeof taskSchema>;

export type TaskSliceT = {
  tasks: TaskT[];
  selectedTask: TaskT | null;
  selectedDifficulty: string | null;
  selectedModuleId: number | null;
  status: string;
};
