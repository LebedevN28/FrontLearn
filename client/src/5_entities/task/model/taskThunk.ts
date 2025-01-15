import { createAsyncThunk } from '@reduxjs/toolkit';
import taskService from '../api/taskService';

export const getAllTasksThunk = createAsyncThunk('tasks/getAllTasksThunk', () =>
  taskService.getAllTasks(),
);

export const getTasksByDifficultyThunk = createAsyncThunk(
  'tasks/getTasksByDifficultyThunk',
  async (difficulty: 'easy' | 'medium' | 'hard') =>
    await taskService.getTasksByDifficulty(difficulty),
);

export const getTasksByModuleIdThunk = createAsyncThunk(
  'tasks/getTasksByModuleIdThunk',
  async ({ moduleId, difficulty }: { moduleId: number; difficulty: string }) =>
    await taskService.getTasksByModuleId({ moduleId, difficulty }),
);

export const getTaskByIdThunk = createAsyncThunk('tasks/getTaskByIdThunk', async (taskId: number) =>
  taskService.getTaskById(taskId),
);
