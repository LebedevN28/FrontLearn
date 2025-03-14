import type { z } from 'zod';
import type { progressSchema, taskProgressSchema } from '../model/progress.schema';

// Тип для одной записи прогресса
export type ProgressType = z.infer<typeof progressSchema>;

// Тип для суммарного прогресса пользователя
export type TaskProgressType = z.infer<typeof taskProgressSchema>;

// Тип состояния Redux Slice для прогресса
export type ProgressSliceType = {
  progressTotal: ProgressType[]; // Список общего прогресса пользователя
  progressModule: TaskProgressType[]; // Список прогресса пользователя по модулю
  progressTask: ProgressType | null; // Есть ли таблица прогресса решения задачи
  error: string | null; // Сообщение об ошибке
};
