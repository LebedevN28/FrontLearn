import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserType } from './user.types';
import {
  getAllUsersThunk,
  getUserByIdThunk,
  editAccountValuesThunk,
  uploadPhotoThunk,
  deleteUserThunk,
  updateStatsThunk,
} from './userThunks';
import type { UserStatsType } from '../../userAchievement/model/userStats.types';

type UserState = {
  stats: UserStatsType;
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
    updateUserPoints: (state, action: PayloadAction<{ userId: number; points: number }>) => {
      const { userId, points } = action.payload;

      /* eslint-disable @typescript-eslint/no-unnecessary-condition */
      const user = state.users.find((u) => u.id === userId);
      if (user) {
        user.points = (user.points ?? 0) + points;
        user.level = Math.floor((user.points ?? 0) / 100);
      }
      /* eslint-disable @typescript-eslint/no-unnecessary-condition */
      if (state.selectedUser && state.selectedUser.id === userId) {
        state.selectedUser.points = (state.selectedUser.points ?? 0) + points;
        state.selectedUser.level = Math.floor((state.selectedUser.points ?? 0) / 100);
      }
    },
  },
  extraReducers(builder) {
    builder
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .addCase(updateStatsThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .addCase(updateStatsThunk.fulfilled, (state, action: PayloadAction<UserStatsType>) => {
        state.status = 'succeeded';
        state.stats = action.payload;
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .addCase(updateStatsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
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

export const { updateStats, updateUserPoints } = userSlice.actions;
export default userSlice.reducer;
