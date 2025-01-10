import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ModuleType } from './module.types';
import moduleService from '../api/moduleService';

// Получить все модули
export const getModules = createAsyncThunk<ModuleType[]>(
  'modules/getModules',
  async (_, { rejectWithValue }) => {
    try {
      return await moduleService.getModules();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  },
);

// Получить модуль по ID
export const getModuleById = createAsyncThunk<ModuleType, number>(
  'modules/getModuleById',
  async (moduleId, { rejectWithValue }) => {
    try {
      return await moduleService.getModuleById(moduleId);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  },
);
