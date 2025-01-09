import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../6_shared/lib/hooks';
import { setSelectedNote } from '../../note/model/noteSlice';
import { editNoteThunk } from '../../note/model/noteThunks';
import { updatePlayerScore } from '../../../4_features/player/playerSlice';

export default function NoteUpdateModal(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const selectedNote = useAppSelector((state) => state.notes.selectedNote);

  // Состояния
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<{ id: string } | null>(null);

  // Закрытие основного модального окна
  const handleClose = (): void => {
    dispatch(setSelectedNote(null));
    setShowPlayerModal(false);22
    setShowAnswer(false);
  };

  // Показать и скрыть ответ
  const handleShowAnswer = () => setShowAnswer(true);
  const handleHideAnswer = () => setShowAnswer(false);

  // Открытие модального окна игрока
  const handlePlayerClick = (playerId: string) => {
    setSelectedPlayer({ id: playerId });
    setShowPlayerModal(true);
  };

  const handlePlayerModalClose = () => {
    setShowPlayerModal(false); // Закрытие модального окна игрока
    handleClose(); // Закрытие основного модального окна
  };

  // Обработчик формы
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await dispatch(
        editNoteThunk({
          id: selectedNote?.id || 0,
          formData,
        }),
      );
      handleClose();
    } catch (error) {
      console.error('Ошибка отправки данных:', error);
    }
  };

  return (
    <>
      {/* Основное модальное окно */}
      <Modal show={!!selectedNote} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Вопрос</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Row>
              <Col xs={12}>
                <Form.Group className="mb-3 text-center">
                  <Form.Label style={{ fontSize: '1.5rem', color: 'black' }}>
                    {selectedNote?.content || 'Вопрос не найден'}
                  </Form.Label>
                </Form.Group>
              </Col>
              <Col xs={12} className="d-flex justify-content-around">
                {[1, 2, 3].map((player) => (
                  <Button
                    key={player}
                    variant="primary"
                    onClick={() => handlePlayerClick(`player${player}`)}
                    style={{
                      margin: '10px',
                      width: '30%',
                    }}
                  >
                    Игрок {player}
                    <br />
                    имя игрока
                    <br />
                    очки
                  </Button>
                ))}
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Далее
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Модальное окно для игрока */}
      <Modal show={showPlayerModal} onHide={handlePlayerModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Игрок №{selectedPlayer?.id || '?'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Button
              style={{
                backgroundColor: 'SpringGreen',
                margin: '7px 0',
                color: 'black',
              }}
              onClick={async () => {
                if (selectedPlayer) {
                  try {
                    console.log('Updating score for player:', selectedPlayer.id);
                    await dispatch(updatePlayerScore({ id: selectedPlayer.id, scoreChange: 1 }));
                    console.log('Score updated successfully');
                    handlePlayerModalClose(); // Закрытие обоих модальных окон
                  } catch (error) {
                    console.error('Error updating score:', error);
                  }
                } else {
                  console.error('No player selected');
                }
              }}
            >
              ОТВЕТ ВЕРНЫЙ
            </Button>

            <Button
              style={{
                backgroundColor: 'LightCoral',
                margin: '7px 0',
                color: 'black',
              }}
              onClick={handlePlayerModalClose} // Закрытие обоих модальных окон
            >
              ОТВЕТ НЕВЕРНЫЙ
            </Button>

            <Button variant="secondary" style={{ marginTop: '20px' }} onClick={handleShowAnswer}>
              Показать ответ
            </Button>
            {showAnswer && (
              <p
                style={{
                  color: 'black',
                  marginTop: '20px',
                  textAlign: 'center',
                }}
              >
                {selectedNote?.answer || 'Ответ не найден'}
              </p>
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideAnswer}>
            Скрыть ответ
          </Button>
          <Button variant="secondary" onClick={handlePlayerModalClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


//  <div style={{ marginTop: '50px' }}>
//    <h3 className="text-center">Игроки</h3>
//    <Row className="justify-content-center g-3">
//      {players.map((player) => (
//              <Card.Title>{player.name}</Card.Title>
//        </Col>
//      ))}
//    </Row>
//  </div>;