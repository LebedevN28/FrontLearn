import  React, { use } from 'react';
import { store } from '../../store/store';
import { refreshThunk } from '../../../4_features/auth/model/authThunks';
import { getModules } from '../../../5_entities/module/model/moduleThunks';
import { getProgressByUser } from '../../../5_entities/progress/model/progressThunks';
import { getAchievements } from '../../../5_entities/achievement/model/achievementThunks';
import { getTasks } from '../../../5_entities/task/model/taskThunks';

type InitProviderProps = {
  children: React.JSX.Element;
};

// Асинхронная инициализация
const initAuth = store.dispatch(refreshThunk());
const initModules = store.dispatch(getModules());
const initAchievements = store.dispatch(getAchievements());
const initTasks = store.dispatch(getTasks());
const initProgress = store.dispatch(getProgressByUser(1));

// Ожидаем завершения всех асинхронных операций
const initPromise = Promise.allSettled([
  initAuth,
  initModules,
  initAchievements,
  initTasks,
  initProgress,
]);

export default function InitProvider({ children }: InitProviderProps): React.JSX.Element {
  // Ожидание завершения инициализации
  use(initPromise);

  // После завершения загрузки рендерим дочерние компоненты
  return children;
}
