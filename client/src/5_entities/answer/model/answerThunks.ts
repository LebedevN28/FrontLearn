import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AnswerType } from './answer.types';
import answerService from '../api/answerService'; 


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
