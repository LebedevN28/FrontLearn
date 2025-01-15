import { createSlice } from '@reduxjs/toolkit';
import { saveUserAchievements, fetchUserAchievements } from './userAchievementThunks';
import type { AchievementType } from '../../achievement/model/achievement.types';

type UserAchievementsState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  unlockedAchievementsIds: number[];
};

const initialState: UserAchievementsState = {
  status: 'idle',
  error: null,
  unlockedAchievementsIds: [],
};

const userAchievementsSlice = createSlice({
  name: 'userAchievements',
  initialState,
  reducers: {
    addUnlockedAchievements(state, action: { payload: number[] }) {
      // Добавляем уникальные ID к уже разблокированным
      state.unlockedAchievementsIds = [
        ...new Set([...state.unlockedAchievementsIds, ...action.payload]),
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка получения достижений с сервера
      .addCase(fetchUserAchievements.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserAchievements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.unlockedAchievementsIds = action.payload.map(
          (achievement: AchievementType) => achievement.id,
        );
      })
      .addCase(fetchUserAchievements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Failed to fetch achievements';
      })

      // Обработка сохранения достижений
      .addCase(saveUserAchievements.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(saveUserAchievements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.unlockedAchievementsIds = [
          ...new Set([...state.unlockedAchievementsIds, ...action.payload]),
        ]; // Добавляем новые достижения
      })
      .addCase(saveUserAchievements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Failed to save achievements';
      });
  },
});

export const { addUnlockedAchievements } = userAchievementsSlice.actions;
export const userAchievementsReducer = userAchievementsSlice.reducer;
export default userAchievementsReducer;
