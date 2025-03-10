import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProfileEditForm from '../../3_widgets/EditForms/ProfileEditForm';
import { AuthStatus } from '../../4_features/auth/model/auth.types';
import { logoutThunk } from '../../4_features/auth/model/authThunks';
import { Button } from '@mui/material';
import {
  deleteUserThunk,
  getUserByIdThunk,
  uploadPhotoThunk,
} from '../../5_entities/user/model/userThunks';
import { useAppDispatch, useAppSelector } from '../../6_shared/lib/hooks';
import DeleteConfirmationModal from '../../4_features/deleteModal/DeleteConfirmationModal'
import './ProfilePage.css'; 

export default function ProfilePage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.selectedUser);
  const data = useAppSelector((store) => store.auth.data);
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (): void => {
    setIsEditing(true);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        await dispatch(uploadPhotoThunk({ id: Number(id), formData }));
        await dispatch(getUserByIdThunk(Number(id)));
      } catch (error) {
        console.error(error);
        setErrorMessage('Ошибка загрузки фотографии');
      }
    }
  };

  const handleDeleteConfirm = async (): Promise<void> => {
    try {
      await dispatch(deleteUserThunk(Number(id)));
      await dispatch(logoutThunk());
    } catch (error) {
      console.error(error);
      setErrorMessage('Ошибка удаления пользователя');
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  useEffect(() => {
    if (data.status === AuthStatus.authenticated && data.user.id === Number(id)) {
      dispatch(getUserByIdThunk(Number(id))).catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  return (
    <div className="profile-page">
      <h1 className="profile-page__heading">{user?.name}</h1>

      <div className="profile-page__container">
        <div className="profile-page__info-container">
          <div className="profile-page__info">Очки: {user?.points}</div>
          <div className="profile-page__info">Уровень: {user?.level}</div>
        </div>
      </div>
      <div className="profile-page__container">
        <div className="profile-page__photo-container">
          <>
            <img
              src={user?.image ? `/images/${user.image}` : '/imgs/hog.png'}
              alt="User"
              className="profile-page__photo"
              style={{ width: '150px' }}
            />
            {errorMessage && <p className="error">{errorMessage}</p>}
            <div className="profile-page__input">
              <input
                id="addPicInput"
                type="file"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
              />
              <label htmlFor="addPicInput">
                <Button
                  variant="contained"
                  component="span"
                  sx={{ width: '100%', marginTop: '10px' }}
                  color="secondary"
                >
                  Выбери картинку
                </Button>
              </label>
            </div>
          </>
        </div>
        <div className="profile-page__values-container">
          {isEditing && user ? (
            <ProfileEditForm user={user} setIsEditing={setIsEditing} />
          ) : (
            <div className="profile-page__values-container">
              <div className="profile-page__value">
                <label htmlFor="name">Имя:</label>
                <span>{user?.name}</span>
              </div>

              <div className="profile-page__value">
                <label htmlFor="email">Email:</label>
                <span>{user?.email}</span>
              </div>

              <Button
                variant="contained"
                color="success"
                sx={{ width: '50%' }}
                onClick={handleEdit}
              >
                Изменить данные
              </Button>
            </div>
          )}
          <Button
            variant="contained"
            color="error"
            sx={{ width: '50%', marginTop: '10px' }}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Удалить аккаунт
          </Button>
        </div>
      </div>
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
