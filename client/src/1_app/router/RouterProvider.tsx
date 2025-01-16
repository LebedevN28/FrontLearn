import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import ProtectedRoute from '../../4_features/auth/lib/ProtectedRoute';
import { useAppDispatch, useAppSelector } from '../../6_shared/lib/hooks';
import SignupPage from '../../2_pages/Auth/SignupPage/SignupPage';
import LoginPage from '../../2_pages/Auth/LoginPage/LoginPage';
import MainPage from '../../2_pages/MainPage/MainPage';
import Layout from '../../2_pages/Layout/Layout';
import { AuthStatus } from '../../4_features/auth/model/auth.types';
import QuestionPage from '../../2_pages/QuestionPage/QuestionPage';
import ProfilePage from '../../2_pages/ProfilePage/ProfilePage';
import StartPage from '../../2_pages/StartPage/StartPage';
import TasksPage from '../../2_pages/TasksPage/TasksPage';
import LeaderboardPage from '../../2_pages/LeaderboardPage/LeaderboardPage';
import { getTotalUserProgressThunk } from '../../5_entities/progress/model/progressThunks';
import { getUserByIdThunk } from '../../5_entities/user/model/userThunks';
import DailyTaskPage from '../../2_pages/DailyTaskPage/DailyTaskPage';
import NotFoundPage from '../../2_pages/NotFoundPage/NotFoundPage';
export default function RouterProvider(): React.JSX.Element {
  const authData = useAppSelector((store) => store.auth.data);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (authData.status === AuthStatus.authenticated) {
      const userId = authData.user.id;
      dispatch(getTotalUserProgressThunk(userId)).catch(console.error);
      dispatch(getUserByIdThunk(Number(userId))).catch(console.error);
    }
  }, [authData, dispatch]);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute
              isAllowed={authData.status === AuthStatus.authenticated}
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
              isAllowed={authData.status === AuthStatus.authenticated}
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
              isAllowed={authData.status === AuthStatus.authenticated}
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
              isAllowed={authData.status === AuthStatus.authenticated}
              redirectTo="/auth/login"
            >
              <TasksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute
              isAllowed={authData.status === AuthStatus.authenticated}
              redirectTo="/auth/login"
            >
              <LeaderboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/daily"
          element={
            <ProtectedRoute
              isAllowed={authData.status === AuthStatus.authenticated}
              redirectTo="/auth/login"
            >
              <DailyTaskPage />
            </ProtectedRoute>
          }
        />

        {/* Аутентификация */}
        <Route
          element={
            <ProtectedRoute isAllowed={authData.status === AuthStatus.guest} redirectTo="/" />
          }
        >
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
        </Route>
      <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
