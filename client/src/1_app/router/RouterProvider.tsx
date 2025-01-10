import React from 'react';
import { Route, Routes } from 'react-router';
import ProtectedRoute from '../../4_features/auth/lib/ProtectedRoute';
import { useAppSelector } from '../../6_shared/lib/hooks';
import SignupPage from '../../2_pages/Auth/SignupPage/SignupPage';
import MainPage from '../../2_pages/Note/MainPage/MainPage';
import Layout from '../../2_pages/Layout/Layout';
import { AuthStatus } from '../../4_features/auth/model/auth.types';
import AddNotePage from '../../2_pages/Note/AddNotePage/AddNotePage';
import LoginPage from '../../2_pages/Auth/LoginPage/LoginPage';
import RezultPage from '../../2_pages/Note/RezultPage/RezultPage';
import StartPage from '../../2_pages/Note/StartPage/StartPage';
import ProfilePage from '../../2_pages/ProfilePage/ProfilePage';

export default function RouterProvider(): React.JSX.Element {
  const status = useAppSelector((store) => store.auth.data.status);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />

        <Route path="/start" element={<StartPage />} />

        <Route path="/rezult" element={<RezultPage />} />

        <Route
          path="/notes/add"
          element={
            <ProtectedRoute
              isAllowed={status === AuthStatus.authenticated}
              redirectTo="/auth/login"
            >
              <AddNotePage />
            </ProtectedRoute>
          }
        />

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

        <Route path="/notes/:noteId" element={<h1>Work in progress</h1>} />

        <Route
          element={<ProtectedRoute isAllowed={status === AuthStatus.guest} redirectTo="/start" />}
        >
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
