import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function QuestionModal(): React.JSX.Element {
  // const chosenQuestion = useAppSelector((store) => store.messages.chosenMessage);
  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{questions.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Тайм-аут 30 секунд</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="info">Игрок 1</Button>
          <Button variant="info">Игрок 2</Button>
          <Button variant="info">Игрок 3</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { clearChosenMessage } from '../../entities/message/model/messageSlice';
import { Form } from 'react-bootstrap';
import { editMessageThunk } from '../../entities/message/model/messageThunks';
import { AiFillQuestionCircle } from 'react-icons/ai';

export default function EditModal(): React.JSX.Element {
  const chosenMessage = useAppSelector((store) => store.messages.chosenMessage);
  const dispatch = useAppDispatch();
  const handleClose = (): void => {
    dispatch(clearChosenMessage());
  };
  return (
    <Modal show={!!chosenMessage} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{chosenMessage?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            if (!chosenMessage) return;
            dispatch(editMessageThunk({ id: chosenMessage.id, formData }))
              .then(handleClose)
              .catch(console.log);
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Заголовок</Form.Label>
            <Form.Control
              defaultValue={chosenMessage?.title}
              name="title"
              type="text"
              placeholder="Заголовок"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              name="body"
              defaultValue={chosenMessage?.body}
              rows={5}
              type="text"
              as="textarea"
              placeholder="О чём ты хочешь написать?"
            />
          </Form.Group>

          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" type="submit">
            Сохранить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
