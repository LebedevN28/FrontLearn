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

type UserState = {
  users: UserType[];
  selectedUser: UserType | null;
};

const initialState: UserState = {
  users: [],
  selectedUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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

export default userSlice.reducer;
