import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../../6_shared/lib/hooks';
import { getAllNotesThunk } from '../../../5_entities/note/model/noteThunks';
import { getNotebooksThunk } from '../../../5_entities/notebook/model/notebookThunks';
import NoteCard from '../../../3_widgets/NoteList/NoteList';
import NoteUpdateModal from '../../../5_entities/user/ui/NoteUpdateModal';
import Card from 'react-bootstrap/Card';

export default function GameBoard(): React.JSX.Element {
  const notes = useAppSelector((store) => store.notes.notes);
  const notebooks = useAppSelector((store) => store.notebooks.notebooks);
  const players = useAppSelector((store) => store.players.players); // Получаем игроков
  const dispatch = useAppDispatch();
  const userId = useAppSelector((store) => store.auth.data.status);

  // Загружаем заметки и ноутбуки при смене пользователя
  useEffect(() => {
    if (userId) {
      dispatch(getAllNotesThunk());
      dispatch(getNotebooksThunk());
    }
  }, [userId, dispatch]);

  // Группируем заметки по notebookId
  const groupedNotes = notes.reduce(
    (acc, note) => {
      if (!acc[note.notebookId]) {
        acc[note.notebookId] = [];
      }
      acc[note.notebookId].push(note);
      return acc;
    },
    {} as Record<number, typeof notes>,
  );

  // Получаем название категории по notebookId
  const getNotebookName = (notebookId: number): string => {
    const notebook = notebooks.find((n) => n.id === notebookId);
    return notebook ? notebook.name : 'Без названия';
  };

  return (
    <Container className="py-4" style={{ color: 'white' }}>
      {/* Вывод вопросов по категориям */}
      {Object.entries(groupedNotes).map(([notebookId, notesInCategory]) => (
        <Row key={notebookId} className="mb-4 align-items-center">
          <Col xs={2} className="text-center">
            <h5>{getNotebookName(Number(notebookId))}</h5>
          </Col>
          <Col xs={10}>
            <Row className="g-3">
              {notesInCategory.map((note) => (
                <Col
                  key={note.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={2}
                  className="d-flex justify-content-center"
                >
                  <NoteCard note={note} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      ))}

      {/* Добавляем игроков */}
      <div style={{ marginTop: '50px' }}>
        <h3 className="text-center">Игроки</h3>
        <Row className="justify-content-center g-3">
          {players.map((player) => (
            <Col
              key={player.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="d-flex justify-content-center"
            >
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={player.image} />
                <Card.Body>
                  <Card.Title>{player.name}</Card.Title>
                  <Card.Text>Очки: {player.count}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <NoteUpdateModal />
    </Container>
  );
}
