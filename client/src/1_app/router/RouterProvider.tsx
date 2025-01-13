import React from 'react';
import { Route, Routes } from 'react-router';
import ProtectedRoute from '../../4_features/auth/lib/ProtectedRoute';
import { useAppSelector } from '../../6_shared/lib/hooks';
import SignupPage from '../../2_pages/Auth/SignupPage/SignupPage';
import LoginPage from '../../2_pages/Auth/LoginPage/LoginPage';
import MainPage from '../../2_pages/MainPage/MainPage';
import Layout from '../../2_pages/Layout/Layout';
import { AuthStatus } from '../../4_features/auth/model/auth.types';
import QuestionPage from '../../2_pages/QuestionPage/QuestionPage';
import ProfilePage from '../../2_pages/ProfilePage/ProfilePage';
import StartPage from '../../2_pages/StartPage/StartPage';
import TasksPage from '../../2_pages/TasksPage/TasksPage';

export default function RouterProvider(): React.JSX.Element {
  const status = useAppSelector((store) => store.auth.data.status);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute
              isAllowed={status === AuthStatus.authenticated}
              redirectTo="/auth/login"
            >
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/start"
          element={
            <ProtectedRoute
              isAllowed={status === AuthStatus.authenticated}
              redirectTo="/auth/login"
            >
              <StartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task/:taskId"
          element={
            <ProtectedRoute
              isAllowed={status === AuthStatus.authenticated}
              redirectTo="/auth/login"
            >
              <QuestionPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/:moduleId"
          element={
            <ProtectedRoute
              isAllowed={status === AuthStatus.authenticated}
              redirectTo="/auth/login"
            >
              <TasksPage />
            </ProtectedRoute>
          }
        />

        {/* Аутентификация */}
        <Route element={<ProtectedRoute isAllowed={status === AuthStatus.guest} redirectTo="/" />}>
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
