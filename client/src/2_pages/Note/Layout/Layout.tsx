import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router';
import Header from '../../../3_widgets/header/Header';

export default function Layout(): React.JSX.Element {
  const backgroundImage = '/images/layout_images_new1.webp';

  return (
    <Container
      fluid
      style={{
        backgroundImage: `url(${backgroundImage})`, // Добавьте url() вокруг переменной
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
