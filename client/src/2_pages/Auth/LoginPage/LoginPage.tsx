import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppDispatch } from '../../../6_shared/lib/hooks';
import { loginThunk } from '../../../4_features/auth/model/authThunks';

export default function LoginPage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    void dispatch(loginThunk(new FormData(e.currentTarget)));
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
