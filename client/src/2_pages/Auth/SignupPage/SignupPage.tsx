import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useAppDispatch } from '../../../6_shared/lib/hooks';
import { signupThunk } from '../../../4_features/auth/model/authThunks';
import { signupFormSchema } from '../../../5_entities/user/model/user.schema';

export default function SignupPage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      // Преобразуем и валидируем данные перед отправкой
      const validatedData = signupFormSchema.parse(data);
      void dispatch(signupThunk(validatedData));
    } catch (error) {
      console.error('Validation error:', error);
      // Вы можете добавить вывод ошибки пользователю
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Sign Up</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter name" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
