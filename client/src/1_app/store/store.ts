import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../4_features/auth/model/authSlice';
import tasksReducer from '../../5_entities/task/model/taskSlice';
import achievementReducer from '../../5_entities/achievement/model/achievementSlice';
import modulesReducer from '../../5_entities/module/model/moduleSlice';
import progressReducer from '../../5_entities/progress/model/progressSlice';
import answerReducer from '../../5_entities/answer/model/answerSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
    modules: modulesReducer,
    achievements: achievementReducer,
    progress: progressReducer,
    answers: answerReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
