import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AddNoteForm from '../../../3_widgets/addNoteForm/AddNoteForm';

export default function AddNotePage(): React.JSX.Element {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={4}>
          <AddNoteForm />
        </Col>
      </Row>
    </Container>
  );
}
