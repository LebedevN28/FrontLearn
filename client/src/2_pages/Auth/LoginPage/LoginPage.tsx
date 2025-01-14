import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppDispatch } from '../../../6_shared/lib/hooks';
import { loginThunk } from '../../../4_features/auth/model/authThunks';
import styles from './LoginPage.module.css'; // Импортируем стили

export default function LoginPage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    void dispatch(loginThunk(new FormData(e.currentTarget)));
  };

  return (
    <div className={styles.container}>
     {/* <img
     src='/imgs/leaves.jpeg' 
     /> */}
      <Form
        onSubmit={submitHandler}
        className={styles.formContainer}
      >
        <h2>Вход</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Введите email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" name="password" placeholder="Введите пароль" required />
        </Form.Group>

        <Button variant="primary" type="submit" className={styles.buttonSubmit}>
          Войти
        </Button>
      </Form>
    </div>
  );
}
