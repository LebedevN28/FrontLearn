import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Form, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../6_shared/lib/hooks';
import { useNavigate } from 'react-router'; // Импорт useNavigate
import { addPlayer } from '../../../4_features/player/playerSlice';
import { PlayerType } from '../../../4_features/player/types';
import Card from 'react-bootstrap/Card';
import styles from './MainPage.module.css';

export default function MainPage(): React.JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Создаем хук для навигации
  const data = useAppSelector((store) => store.players.players);

  const defaultImage =
    'https://www.dk.ru/system/images/news/000/917/795_x_large_new_origin_copyright.jpg';

  const handleShow = (): void => setShowModal(true);
  const handleClose = (): void => setShowModal(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formObject = Object.fromEntries(formData.entries());

    const players: PlayerType[] = Object.keys(formObject).map((key, index) => ({
      id: String(index + 1),
      name: formObject[key] as string,
      count: 0,
      image: defaultImage,
    }));

    players.forEach((player) => dispatch(addPlayer(player)));

    handleClose();
  };

  // Обработчик для перехода на страницу заметок
  const handleStart = () => {
    navigate('/notes'); // Перенаправление на страницу заметок
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Добро пожаловать на "Свою игру-Эльбрус"!</h1>
      <h2 className={styles.subheading}>
        Проверьте свои знания, сразитесь с друзьями и станьте настоящим интеллектуальным чемпионом!
        Начнем? 🎮💡
      </h2>

      <Button variant="outline-success" size="lg" onClick={handleShow}>
        Добавить игроков!🎮
      </Button>
      <Button variant="outline-success" size="lg" onClick={handleStart}>
        Начать!🎮
      </Button>

      <div className={styles.playerContainer}>
        <h3>Игроки:</h3>
        <div className={styles.cards}>
          {data.length > 0 ? (
            data.map((player) => (
              <Card style={{ width: '18rem', margin: '1rem' }} key={player.id}>
                <Card.Img variant="top" src={player.image || defaultImage} />
                <Card.Body>
                  <Card.Title>{player.name}</Card.Title>
                  <Card.Text>Очки: {player.count}</Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>Игроки не добавлены.</p>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Введите имена игроков</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} className="mb-3">
                <Form.Group controlId="player1">
                  <Form.Label>Игрок 1</Form.Label>
                  <Form.Control
                    type="text"
                    name="player1"
                    placeholder="Введите имя первого игрока"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} className="mb-3">
                <Form.Group controlId="player2">
                  <Form.Label>Игрок 2</Form.Label>
                  <Form.Control
                    type="text"
                    name="player2"
                    placeholder="Введите имя второго игрока"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} className="mb-3">
                <Form.Group controlId="player3">
                  <Form.Label>Игрок 3</Form.Label>
                  <Form.Control
                    type="text"
                    name="player3"
                    placeholder="Введите имя третьего игрока"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Отмена
              </Button>
              <Button variant="primary" type="submit">
                Сохранить
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
