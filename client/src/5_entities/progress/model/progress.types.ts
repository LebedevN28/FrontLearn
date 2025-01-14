import type { z } from 'zod';
import type { progressSchema } from '../model/progress.schema';

// Тип для одной записи прогресса
export type ProgressType = z.infer<typeof progressSchema>;

// Тип состояния Redux Slice для прогресса
export type ProgressSliceType = {
  progressTotal: ProgressType[]; // Список общего прогресса пользователя
  progressModule: ProgressType[]; // Список прогресса пользователя по модулю
  progressTask: ProgressType | null; // Есть ли таблица прогресса решения задачи
  error: string | null; // Сообщение об ошибке
};
