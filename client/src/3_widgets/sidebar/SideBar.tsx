import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink as RouterLink } from 'react-router';
import { FaGlobe, FaBoxOpen, FaTrophy } from 'react-icons/fa'; 
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
        <Col className="sidebar-btn">
          <FaGlobe className="sidebar-icon" /> 
          <span>Обучение</span>
        </Col>

        <div className={`sidebar-row__hover-bar ${isHovered ? 'visible' : ''}`}>
          <RouterLink to={`/tasks/1`} className="sidebar-row__hoverbar-btn">
            Фаза 1
          </RouterLink>
          <RouterLink to={`/tasks/2`} className="sidebar-row__hoverbar-btn">
            Фаза 2
          </RouterLink>
          <RouterLink to={`/tasks/3`} className="sidebar-row__hoverbar-btn">
            Фаза 3
          </RouterLink>
        </div>
      </Row>

      <Row className="sidebar-row">
        <RouterLink to={`/daily`}>
        <FaBoxOpen className="sidebar-icon" /> 
          <Col>Вопрос дня</Col>
        </RouterLink>
      </Row>
      <Row className="sidebar-row">
        <RouterLink to={`/leaderboard`}>
        <FaTrophy className="sidebar-icon" /> 
          <Col>Рейтинг</Col>
        </RouterLink>
      </Row>
    </Container>
  );
}
