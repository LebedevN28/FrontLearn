import React, { useActionState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAppDispatch } from '../../6_shared/lib/hooks';
import { useNavigate } from 'react-router';
import { Spinner } from 'react-bootstrap';
import { createNoteThunk } from '../../5_entities/note/model/noteThunks';

export default function AddNoteForm(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [_, action, isPending] = useActionState<null, FormData>(async (__, formData) => {
    // Логируем форму перед отправкой
    console.log('Отправка данных:', formData);

    // Отправка заметки на сервер
    await dispatch(createNoteThunk(formData));
    void navigate('/notes'); // Переход на страницу всех заметок
    return null;
  }, null);

  return (
    <Form action={action} encType="multipart/form-data">
      {/* Заголовок заметки */}
      <Form.Group className="mb-3">
        <Form.Label>Заголовок заметки</Form.Label>
        <Form.Control name="title" type="text" placeholder="Введите заголовок" required />
      </Form.Group>

      {/* Содержание заметки */}
      <Form.Group className="mb-3">
        <Form.Label>Содержание заметки</Form.Label>
        <Form.Control
          name="content"
          as="textarea"
          rows={5}
          placeholder="Напишите текст заметки"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Блокнот</Form.Label>
        <Form.Control name="notebookId" type="number" placeholder="Введите ID блокнота" required />
      </Form.Group>

      {/* Кнопка отправки */}
      <Button disabled={isPending} variant="primary" type="submit">
        {isPending ? <Spinner size="sm" animation="border" /> : 'Создать заметку'}
      </Button>
    </Form>
  );
}
