import React from 'react';
import { useAppSelector } from '../../../6_shared/lib/hooks';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PhaseCard from '../../../4_features/PhaseCard/PhaseCard';


export default function StartPage(): React.JSX.Element {
  const modules = useAppSelector((store) => store.modules.modules);

  return (
    <Container>
      <Row className="justify-content-center">
        {modules.map((module) => (
         <PhaseCard key={module.id} module={module} />
        ))}
      </Row>
    </Container>
  );
}
