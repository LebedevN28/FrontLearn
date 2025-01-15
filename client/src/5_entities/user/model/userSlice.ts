import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserType } from './user.types';
import {
  getAllUsersThunk,
  getUserByIdThunk,
  editAccountValuesThunk,
  uploadPhotoThunk,
  deleteUserThunk,
} from './userThunks';
import { UserStatsType } from '../../userAchievement/model/userStats.types';

type UserState = {
  stats: UserStatsType; // Добавляем статистику
  selectedUser: UserType | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  users: UserType[];
};

const initialState: UserState = {
  stats: { level: 1, totalAnswers: 0 },
  users: [],
  selectedUser: null,
  status: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateStats: (state, action: PayloadAction<Partial<UserStatsType>>) => {
      state.stats = {
        ...state.stats,
        ...action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getUserByIdThunk.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.selectedUser = action.payload;
      })
      .addCase(editAccountValuesThunk.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        if (state.selectedUser && state.selectedUser.id === updatedUser.id) {
          state.selectedUser = updatedUser;
        }
      })
      .addCase(uploadPhotoThunk.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        if (state.selectedUser && state.selectedUser.id === updatedUser.id) {
          state.selectedUser = updatedUser;
        }
      })
      .addCase(deleteUserThunk.fulfilled, (state) => {
        state.selectedUser = null;
      });
  },
});

export const { updateStats } = userSlice.actions;
export default userSlice.reducer;
