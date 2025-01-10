import type { z } from 'zod';
import type { progressSchema } from '../model/progress.schema';

// Тип для одной записи прогресса
export type ProgressType = z.infer<typeof progressSchema>;

// Тип состояния Redux Slice для прогресса
export type ProgressSliceType = {
  progress: ProgressType[]; // Список прогресса пользователя
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Состояние загрузки
  error: string | null; // Сообщение об ошибке
};
