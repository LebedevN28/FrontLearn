import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useAppDispatch } from '../../../6_shared/lib/hooks';
import { signupThunk } from '../../../4_features/auth/model/authThunks';
import { signupFormSchema } from '../../../5_entities/user/model/user.schema';
import styles from './SignupPage.module.css';

export default function SignupPage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const validatedData = signupFormSchema.parse(data);
      void dispatch(signupThunk(validatedData));
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  return (
    <Container className={styles.container}>
      <Row className="justify-content-md-center">
        <Col md={8} className={styles.formContainer}>
          <h2>Регистрация</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Имя</Form.Label>
              <Form.Control type="text" name="name" placeholder="Введите имя" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Введите email" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" name="password" placeholder="Введите пароль" required />
            </Form.Group>
            <Button variant="primary" type="submit" className={styles.buttonSubmit}>
              Подтвердить
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={8} className="d-flex justify-content-center">
          <img
            src="/imgs/rega.jpeg" 
            alt="Фоновое изображение"
            className={styles.imageBelowForm}
          />
        </Col>
      </Row>
    </Container>
  );
}