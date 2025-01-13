import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import {
  selectAnswers,
  selectStatus,
  selectError,
} from '../../../5_entities/answer/model/answerSlice';
import { useAppDispatch, useAppSelector } from '../../../6_shared/lib/hooks';
import { getAnswersByTask } from '../../../5_entities/answer/model/answerThunks';

const QuestionPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const dispatch = useAppDispatch();
  const answers = useAppSelector(selectAnswers);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);

  useEffect(() => {
    if (taskId) {
      dispatch(getAnswersByTask(Number(taskId)));
    }
  }, [dispatch, taskId]);

  const filteredAnswers = answers.filter((answer) => answer.taskId === Number(taskId));

  const handleAnswerClick = (answerId: number, isCorrect: boolean) => {
    setSelectedAnswerId(answerId);

    console.log(`Выбран ответ: ${answerId}, правильный: ${isCorrect}`);
  };

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  if (status === 'failed') {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom></Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredAnswers.map((answer) => (
          <Button
            key={answer.id}
            variant="contained"
            onClick={() => handleAnswerClick(answer.id, answer.isCorrect)}
            sx={{
              textTransform: 'none',
              backgroundColor:
                selectedAnswerId === answer.id ? (answer.isCorrect ? 'green' : 'red') : '#3f51b5',
              color: 'white',
              '&:hover': {
                backgroundColor:
                  selectedAnswerId === answer.id
                    ? answer.isCorrect
                      ? 'darkgreen'
                      : 'darkred'
                    : '#303f9f',
              },
            }}
          >
            {answer.content}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default QuestionPage;
