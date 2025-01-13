import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { AuthStatus } from '../../../4_features/auth/model/auth.types'; 
import styles from './MainPage.module.css';
// import hegImage from '../../../../public/images/heg2.jpeg';
import { useAppSelector } from '../../../6_shared/lib/hooks';

export default function MainPage(): React.JSX.Element {
  const navigate = useNavigate();
  const data = useAppSelector((store) => store.auth.data); 

  return (
    <div className={styles['main-container']}>
      <div className={styles['image-container']}>
        <img
          src='/imgs/heg2.jpeg'
          alt="Main Image"
          className={styles['main-image']}
        />
      </div>

      <div className={styles['buttons-container']}>
        {data.status !== AuthStatus.authenticated ? (
          <>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%', marginBottom: '20px' }}
              onClick={() => navigate('/auth/signup')}
            >
              Зарегистрироваться и начать
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: '100%' }}
              onClick={() => navigate('/auth/login')}
            >
              У меня уже есть аккаунт
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="success"
            sx={{ width: '100%' }}
            onClick={() => navigate('/start')}
          >
            Начать игру
          </Button>
        )}
      </div>
    </div>
  );
}

