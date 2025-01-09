import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PlayerType, PlayerSliceType } from './types';

const initialState: PlayerSliceType = {
  players: [],
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<PlayerType>) => {
      state.players.unshift(action.payload);
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter((player) => player.id !== action.payload);
    },
    updatePlayer: (state, action: PayloadAction<PlayerType>) => {
      const targetIndex = state.players.findIndex((player) => player.id === action.payload.id);
      if (targetIndex !== -1) {
        state.players[targetIndex] = action.payload;
      }
    },
    clearPlayers: (state) => {
      state.players = [];
    },
    updatePlayerScore: (state, action: PayloadAction<{ id: string; scoreChange: number }>) => {
      const player = state.players.find((player) => player.id === action.payload.id);
      console.log(player);
      console.log(action.payload);
      if (player) {
        player.count += action.payload.scoreChange;
      }
    },
  },
});

export const { addPlayer, removePlayer, updatePlayer, clearPlayers, updatePlayerScore } =
  playerSlice.actions;

export default playerSlice.reducer;
