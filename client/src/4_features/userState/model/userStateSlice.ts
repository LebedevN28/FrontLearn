import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserState } from './types';
import type { UserType } from '../../../5_entities/user/model/user.types';

const initialState: UserState = {
  users: [],
};

export const userStateSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = userStateSlice.actions;

export default userStateSlice.reducer;
