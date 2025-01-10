import React from 'react';
import { useAppSelector } from '../../../6_shared/lib/hooks';
import { Container, Row, Col, Button } from 'react-bootstrap';

// Пример URL для изображения яблока, вы можете заменить его на ваш собственный
const appleImageUrl = 'https://via.placeholder.com/100?text=Apple';

export default function StartPage(): React.JSX.Element {
  const modules = useAppSelector((store) => store.modules.modules);

  const handleModuleClick = (moduleId: number) => {
    // Логика обработки выбора модуля

    console.log(`Module ${moduleId} clicked`);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        {modules.map((module) => (
          <Col key={module.id} xs={12} sm={6} md={4} lg={3} className="text-center my-3">
            <Button
              variant="outline-primary"
              className="d-flex flex-column align-items-center justify-content-center"
              onClick={() => handleModuleClick(module.id)}
            >
              <img
                src={appleImageUrl}
                alt="Apple"
                style={{ width: '80px', height: '80px', marginBottom: '10px' }}
              />
              {module.title}
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
