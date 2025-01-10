import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink as RouterLink } from 'react-router';
import './SideBar.css';

export default function SideBar(): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container className="sidebar-container" fluid>
      <Row
        className="sidebar-row"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Col>Обучение</Col>

        <div className={`sidebar-row__hover-bar ${isHovered ? 'visible' : ''}`}>
          <RouterLink to={`/phase/1`} className="sidebar-row__hoverbar-btn">
            Фаза 1
          </RouterLink>
          <RouterLink to={`/phase/2`} className="sidebar-row__hoverbar-btn">
            Фаза 2
          </RouterLink>
          <RouterLink to={`/phase/3`} className="sidebar-row__hoverbar-btn">
            Фаза 3
          </RouterLink>
        </div>
      </Row>

      <Row className="sidebar-row">
        <Col>Задания</Col>
      </Row>
    </Container>
  );
}
