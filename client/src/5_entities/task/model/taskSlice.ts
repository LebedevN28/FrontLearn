import { createSlice } from '@reduxjs/toolkit';
import { TaskSliceType } from './task.types';
import { getTasks, getTaskById } from './taskThunks';

const initialState: TaskSliceType = {
  tasks: [],
  selectedTask: null,
  status: 'idle',
  error: null,
  completedTasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCompletedTask(state, action) {
      state.completedTasks.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getTaskById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedTask = action.payload;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setCompletedTask } = taskSlice.actions;
export default taskSlice.reducer;
