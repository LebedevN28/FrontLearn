import { createSlice } from '@reduxjs/toolkit';
import type { AchievementSliceType } from './achievement.types';
import { getAchievements } from './achievementThunks';

const initialState: AchievementSliceType = {
  achievements: [],
  status: 'idle',
  error: null,
};

const achievementSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAchievements.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAchievements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.achievements = action.payload;
      })
      .addCase(getAchievements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch achievements';
      });
  },
});

export const achievementReducer = achievementSlice.reducer;
export default achievementReducer;
