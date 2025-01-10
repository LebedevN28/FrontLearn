import React, { useState, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { BeatLoader } from 'react-spinners';
import type { UserType } from '../../5_entities/user/model/user.types';
import { editAccountValuesThunk } from '../../5_entities/user/model/userThunks';
import { useAppDispatch } from '../../6_shared/lib/hooks';

type ProfileFormValues = {
  name: string;
  email: string;
};

type ProfileFormProps = {
  user: UserType;
  setIsEditing: (isEditing: boolean) => void;
};

type ResActionPayload = {
  text: string;
  message: string;
};

export default function ProfileEditForm({
  user,
  setIsEditing,
}: ProfileFormProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, startTransition] = useTransition();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
    },
  });

  const onSubmit = (info: ProfileFormValues): void => {
    const formData = new FormData();
    Object.keys(info).forEach((key) => {
      formData.append(key, info[key as keyof ProfileFormValues]);
    });
    startTransition(async () => {
      const resultAction = await dispatch(editAccountValuesThunk({ id: user.id, formData }));
      if (editAccountValuesThunk.rejected.match(resultAction)) {
        setErrorMessage((resultAction.payload as ResActionPayload).text);
      } else {
        setErrorMessage(null);
        setIsEditing(false);
        reset(info);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="profile_page__values-container">
        <div className="profile-page__value-edit">
          <label htmlFor="name">Имя:</label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Имя обязательно',
            }}
            render={({ field }) => <input {...field} placeholder="Добавьте имя" />}
          />
        </div>
        {errors.name && <p className="error">{errors.name.message}</p>}

        <div className="profile-page__value-edit">
          <label htmlFor="email">Email:</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email обязателен',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,3}/gm,
                message: 'Некорректный email',
              },
            }}
            render={({ field }) => (
              <input {...field} type="email" id="email" placeholder="Введите email" />
            )}
          />
        </div>
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="profile_page__button-container">
        {' '}
        <button type="submit" className="profile_page__button" disabled={loading}>
          {loading ? <BeatLoader size="10px" color="#e3d9d9" /> : 'Сохранить изменения'}
        </button>
        <button className="profile_page__button" type="button" onClick={() => setIsEditing(false)}>
          Отменить
        </button>
      </div>
    </form>
  );
}
