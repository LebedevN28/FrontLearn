import { createSlice } from '@reduxjs/toolkit';
import { AchievementSliceType } from '../model/achievement.types'; // Путь к типам
import { getAchievements } from '../model/achievementThunks'; // Путь к thunk

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
        state.error = action.payload as string;
      });
  },
});

export const achievementReducer = achievementSlice.reducer;
export default achievementReducer;
