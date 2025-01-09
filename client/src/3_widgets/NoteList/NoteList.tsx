import Card from 'react-bootstrap/Card';
import { useAppDispatch } from '../../6_shared/lib/hooks';
import { NoteType } from '../../5_entities/note/model/types';
import { setSelectedNote } from '../../5_entities/note/model/noteSlice';

type NoteCardProps = {
  note: NoteType;
};

export default function NoteCard({ note }: NoteCardProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <Card
      onClick={() => dispatch(setSelectedNote(note))} // Добавлен обработчик события на карточку
      style={{
        width: '18rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Прозрачный фон
        color: 'white', // Белый текст
        border: '1px solid white', // Белый контур
        borderRadius: '10px', // Скругленные углы
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)', // Легкая тень
        textAlign: 'center', // Центрирование текста
        cursor: 'pointer', // Указатель мыши для интерактивного элемента
      }}
    >
      <Card.Body>
        <Card.Title style={{ fontWeight: 'bold' }}>{note.title}</Card.Title>
      </Card.Body>
    </Card>
  );
}
