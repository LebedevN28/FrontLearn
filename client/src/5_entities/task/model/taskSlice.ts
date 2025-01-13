import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { TaskT, TaskSliceT } from './types';
import { getTasksByDifficultyThunk, getTasksByModuleIdThunk } from './taskThunk';

const initialState: TaskSliceT = {
  tasks: [],
  selectedModuleId: null,
  selectedDifficulty: null,
  status: 'idle',
};

const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<TaskT[]>) {
      state.tasks = action.payload;
    },
    setSelectedModuleId(state, action: PayloadAction<number | null>) {
      state.selectedModuleId = action.payload;
    },
    setSelectedDifficulty(state, action: PayloadAction<'easy' | 'medium' | 'hard' | null>) {
      state.selectedDifficulty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasksByDifficultyThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTasksByDifficultyThunk.fulfilled, (state, action: PayloadAction<TaskT[]>) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(getTasksByDifficultyThunk.rejected, (state, action) => {
        state.status = 'failed';
        console.error('Error fetching tasks by difficulty:', action.error.message);
      })
      .addCase(getTasksByModuleIdThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTasksByModuleIdThunk.fulfilled, (state, action: PayloadAction<TaskT[]>) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(getTasksByModuleIdThunk.rejected, (state, action) => {
        state.status = 'failed';
        console.error('Error fetching tasks by module:', action.error.message);
      });
  },
});

export const { setTasks, setSelectedModuleId, setSelectedDifficulty } = tasksSlice.actions;
export default tasksSlice.reducer;
