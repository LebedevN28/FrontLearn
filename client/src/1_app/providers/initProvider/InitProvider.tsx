import type React from 'react';
import { use } from 'react';
import { store } from '../../store/store';
import { refreshThunk } from '../../../4_features/auth/model/authThunks';
import { getModulesThunk } from '../../../5_entities/module/model/moduleThunks';
import { getAchievements } from '../../../5_entities/achievement/model/achievementThunks';
import { getAllTasksThunk } from '../../../5_entities/task/model/taskThunk';
import { getAllUsersThunk } from '../../../5_entities/user/model/userThunks';
type InitProviderProps = {
  children: React.JSX.Element;
};

// Асинхронная инициализация
const initAuth = store.dispatch(refreshThunk());
const initModules = store.dispatch(getModulesThunk());
const initAchievements = store.dispatch(getAchievements());
const initTasks = store.dispatch(getAllTasksThunk());
const initProgress = store.dispatch(getProgressByUser(1));
const initUsers = store.dispatch(getAllUsersThunk());

// Ожидаем завершения всех асинхронных операций
const initPromise = Promise.allSettled([
  initAuth,
  initModules,
  initAchievements,
  initTasks,
  initProgress,
  initUsers,
]);

export default function InitProvider({ children }: InitProviderProps): React.JSX.Element {
  // Ожидание завершения инициализации
  use(initPromise);

  // После завершения загрузки рендерим дочерние компоненты
  return children;
}
