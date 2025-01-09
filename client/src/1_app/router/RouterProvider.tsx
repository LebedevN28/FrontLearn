import React from 'react';
import { Route, Routes } from 'react-router';
import ProtectedRoute from '../../4_features/auth/lib/ProtectedRoute';
import { useAppSelector } from '../../6_shared/lib/hooks';
import SignupPage from '../../2_pages/Auth/SignupPage/SignupPage';
import MainPage from '../../2_pages/Note/MainPage/MainPage';
import NotesPage from '../../2_pages/Note/NotesPage/NotesPage';
import Layout from '../../2_pages/Note/Layout/Layout';
import { AuthStatus } from '../../4_features/auth/model/auth.types';
import AddNotePage from '../../2_pages/Note/AddNotePage/AddNotePage';
import LoginPage from '../../2_pages/Auth/LoginPage/LoginPage';
import RezultPage from '../../2_pages/Note/RezultPage/RezultPage';

export default function RouterProvider(): React.JSX.Element {
  const status = useAppSelector((store) => store.auth.data.status);

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Главная страница */}
        <Route path="/" element={<MainPage />} />

        {/* Страница со списком заметок */}
        <Route path="/notes" element={<NotesPage />} />
        {/* Pavel добавил */}
        <Route path="/rezult" element={<RezultPage />} />

        {/* Добавление новой заметки */}
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

        {/* Страница для отображения одной заметки */}
        <Route path="/notes/:noteId" element={<h1>Work in progress</h1>} />

        {/* Авторизация */}
        <Route
          element={<ProtectedRoute isAllowed={status === AuthStatus.guest} redirectTo="/notes" />}
        >
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/login" element={<LoginPage />}/>
        </Route>
      </Route>
    </Routes>
  );
}
