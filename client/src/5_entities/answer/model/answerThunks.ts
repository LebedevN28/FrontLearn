import { createAsyncThunk } from '@reduxjs/toolkit';
import { AnswerType } from '../model/answer.types'; // Путь к типам
import answerService from '../api/answerService'; // Путь к сервису

// Получить ответы по ID задачи
export const getAnswersByTask = createAsyncThunk<AnswerType[], number>(
  'answers/getAnswersByTask',
  async (taskId, { rejectWithValue }) => {
    try {
      return await answerService.getAnswersByTask(taskId);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  },
);
