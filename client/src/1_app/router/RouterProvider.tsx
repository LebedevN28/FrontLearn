import React from 'react';
import { Route, Routes } from 'react-router';
import ProtectedRoute from '../../4_features/auth/lib/ProtectedRoute';
import { useAppSelector } from '../../6_shared/lib/hooks';
import SignupPage from '../../2_pages/Auth/SignupPage/SignupPage';
import LoginPage from '../../2_pages/Auth/LoginPage/LoginPage';
// import StartPage from '../../2_pages/Note/StartPage/StartPage';
import MainPage from '../../2_pages/Note/MainPage/MainPage';
import Layout from '../../2_pages/Layout/Layout';
// import ModulePage from '../../2_pages/Module/ModulePage';
// import TaskPage from '../../2_pages/Task/TaskPage';
import { AuthStatus } from '../../4_features/auth/model/auth.types';
import LoginPage from '../../2_pages/Auth/LoginPage/LoginPage';
import RezultPage from '../../2_pages/Note/RezultPage/RezultPage';
import StartPage from '../../2_pages/Note/StartPage/StartPage';
import QuestionPage from '../../2_pages/Note/QuestionPage/QuestionPage';

export default function RouterProvider(): React.JSX.Element {
  const status = useAppSelector((store) => store.auth.data.status);

  return (
    <Routes>
      {/* Общий layout для всех страниц */}
      <Route element={<Layout />}>
        {/* Главная страница */}
        <Route path="/" element={<MainPage  />} />

        {/* Основная страница после входа */}
        <Route
          path="/main"
          element={
            <ProtectedRoute
              isAllowed={status === AuthStatus.authenticated}
              redirectTo="/auth/login"
            >
              <MainPage />
            </ProtectedRoute>
          }
        />

        {/* Страница модуля */}
        <Route
          path="/modules/:moduleId"
          element={
            <ProtectedRoute
              isAllowed={status === AuthStatus.authenticated}
              redirectTo="/auth/login"
            >
              {/* <ModulePage /> */}
            </ProtectedRoute>
          }
        />

        {/* Страница задания */}
        <Route
          path="/tasks/:taskId"
          element={
            <ProtectedRoute
              isAllowed={status === AuthStatus.authenticated}
              redirectTo="/auth/login"
            >
              {/* <TaskPage /> */}
            </ProtectedRoute>
          }
        />

        {/* Аутентификация */}
        <Route
          element={<ProtectedRoute isAllowed={status === AuthStatus.guest} redirectTo="/main" />}
        >
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
