import React from 'react';
import { Col, Button } from 'react-bootstrap';
import type { ModuleType } from '../../5_entities/module/model/module.types';

type PhaseCardProps = {
  module: ModuleType;
};

export default function PhaseCard({ module }: PhaseCardProps): React.JSX.Element {
  const handleModuleClick = () => {
    console.log(`Module ${module.id} clicked`);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="text-center my-3">
      <Button
        variant="outline-primary"
        className="d-flex flex-column align-items-center justify-content-center"
        onClick={handleModuleClick}
      >
        <img
          src="."
          alt={module.title}
          style={{ width: '80px', height: '80px', marginBottom: '10px' }}
        />
        {module.title}
      </Button>
    </Col>
  );
}
