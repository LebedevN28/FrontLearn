import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { TaskT, TaskSliceT } from './types';
import { getTaskByIdThunk, getAllTasksInModuleThunk, getTasksByModuleIdThunk, getTasksByDifficultyThunk } from './taskThunk';

const initialState: TaskSliceT = {
  tasks: [],
  tasksInModule: [],
  selectedModuleId: null,
  selectedTask: null,
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
    setSelectedDifficulty(state, action: PayloadAction<TaskT[]>) {
      state.tasks = action.payload;
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
      })
      .addCase(getAllTasksInModuleThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllTasksInModuleThunk.fulfilled, (state, action: PayloadAction<TaskT[]>) => {
        state.status = 'succeeded';
        state.tasksInModule = action.payload;
      })
      .addCase(getAllTasksInModuleThunk.rejected, (state, action) => {
        state.status = 'failed';
        console.error('Error fetching tasks by module:', action.error.message);
      })
      .addCase(getTaskByIdThunk.fulfilled, (state, action) => {
        state.selectedTask = action.payload;
      });
  },
});

export const { setTasks, setSelectedModuleId, setSelectedDifficulty } = tasksSlice.actions;
export default tasksSlice.reducer;
