import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router';
import Header from '../../3_widgets/header/Header';
import { useAppSelector } from '../../6_shared/lib/hooks';
import { AuthStatus } from '../../4_features/auth/model/auth.types';
import SideBar from '../../3_widgets/sidebar/SideBar';
import './Layout.css';

export default function Layout(): React.JSX.Element {
  const status = useAppSelector((store) => store.auth.data.status);

  return (
    <Container className="layout-container" fluid>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row className="layout-lower">
        {status === AuthStatus.authenticated && (
          <Col xs={2} className="layout-sidebar">
            <SideBar />
          </Col>
        )}
        <Col className="layout-outlet">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
