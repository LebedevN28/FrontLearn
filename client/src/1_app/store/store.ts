import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../4_features/auth/model/authSlice';
import notesReducer from '../../5_entities/note/model/noteSlice';
import notebooksReducer from '../../5_entities/notebook/model/notebookSlice'; // Предполагаем, что редьюсер для "ноутбуков" создан
import playerReducer from '../../4_features/player/playerSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    auth: authReducer,
    notebooks: notebooksReducer,
    players: playerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
