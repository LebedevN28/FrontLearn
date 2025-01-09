import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router';
import Header from '../../../3_widgets/header/Header';

export default function Layout(): React.JSX.Element {

  return (
    <> 
    <Header />
    <Container 
    >
      <Row>
        <Col>
         
        </Col>
      </Row>
      <Row>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
    </>
  );
}

