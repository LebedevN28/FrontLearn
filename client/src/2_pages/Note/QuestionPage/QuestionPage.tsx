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
import { getTaskByIdThunk } from '../../../5_entities/task/model/taskThunk';
import type { AnswerType } from '../../../5_entities/answer/model/answer.types';

const QuestionPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const dispatch = useAppDispatch();
  const answers = useAppSelector(selectAnswers);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const taskTitle = useAppSelector((state ) => state.tasks.selectedTask?.title)

  
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  
  const getBackgroundColor = (answer: AnswerType): string => {
    if (selectedAnswerId === answer.id) {
      return answer.isCorrect ? 'green' : 'red';
    }
    return '#3f51b5';
  };


  useEffect(() => {
    if (taskId) {
      dispatch(getTaskByIdThunk(Number(taskId))).catch(console.log);
      dispatch(getAnswersByTask(Number(taskId))).catch(console.log);
    }
  }, [dispatch, taskId]);

  const filteredAnswers = answers.filter((answer) => answer.taskId === Number(taskId));

  const handleAnswerClick = (answerId: number, isCorrect: boolean): void => {
    setSelectedAnswerId(answerId);

    console.log(`Выбран ответ: ${String(answerId)}, правильный: ${String(isCorrect)}`);
  };

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  if (status === 'failed') {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        {taskTitle}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredAnswers.map((answer) => (
          <Button
            key={answer.id}
            variant="contained"
            onClick={() => handleAnswerClick(answer.id, answer.isCorrect)}
            sx={{
              textTransform: 'none',
              backgroundColor: getBackgroundColor(answer),
              color: 'white',
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
