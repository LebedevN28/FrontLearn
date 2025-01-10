import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskType } from './task.types';
import axiosInstance from '../../../6_shared/api/axiosInstance'; // Ваш кастомный Axios инстанс
import axios from 'axios';

// Асинхронная санка для получения всех задач
export const getTasks = createAsyncThunk<TaskType[]>(
  'tasks/getTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<TaskType[]>('/tasks');
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

// Асинхронная санка для получения задачи по ID
export const getTaskById = createAsyncThunk<TaskType, number>(
  'tasks/getTaskById',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<TaskType>(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

// Обработчик ошибок Axios
function handleAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data?.message || `Error: ${error.response.status}`;
    }
    return 'Network error occurred';
  }
  return 'Unexpected error occurred';
}
