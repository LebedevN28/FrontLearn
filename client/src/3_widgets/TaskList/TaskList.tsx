import Card from 'react-bootstrap/Card';
// import { useAppDispatch } from '../../6_shared/lib/hooks';
import { TaskType } from '../../5_entities/task/model/task.types';
// import { selectedTask } from '../../5_entities/task/model/taskSlice';

type TaskCardProps = {
  task: TaskType; 
};

export default function TaskCard({ task }: TaskCardProps): React.JSX.Element {
  // const dispatch = useAppDispatch(); // Если нужно будет использовать dispatch для Redux

  return (
    <Card
      // onClick={() => dispatch(selectedTask(task))} // Добавить логику, если нужно
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
        <Card.Title style={{ fontWeight: 'bold' }}>{task.title}</Card.Title>
        {/* Опционально, можно отобразить другие поля */}
        {task.description && <Card.Text>{task.description}</Card.Text>}
      </Card.Body>
    </Card>
  );
}
