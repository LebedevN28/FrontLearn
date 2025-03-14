import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppDispatch } from '../../../6_shared/lib/hooks';
import { loginThunk } from '../../../4_features/auth/model/authThunks';
import styles from './LoginPage.module.css'; // Импортируем стили

export default function LoginPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [loginError, setLoginError] = React.useState<string | null>(null);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoginError(null); // Сбрасываем ошибку перед каждой попыткой

    try {
      const result = await dispatch(loginThunk(new FormData(e.currentTarget)));

      // Если логин не удался, выводим ошибку
      if (loginThunk.rejected.match(result)) {
        setLoginError('Неверный email или пароль. Попробуйте снова.');
      }
    } catch (error) {
      console.error('Ошибка при логине:', error);
      setLoginError('Произошла ошибка при попытке входа.');
    }
  };

  return (
    <div className={styles.container}>
      {/* Фоновое изображение */}
      <img src="/imgs/leaves.jpeg" alt="Background" className={styles.backgroundImage} />
      {/* Форма логина */}
      <Form onSubmit={submitHandler} className={styles.formContainer}>
        <h2>Вход</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Введите email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" name="password" placeholder="Введите пароль" required />
        </Form.Group>

        {loginError && <div className={styles.errorMessage}>{loginError}</div>}
        <Button variant="primary" type="submit" className={styles.buttonSubmit}>
          Войти
        </Button>
      </Form>
    </div>
  );
}
