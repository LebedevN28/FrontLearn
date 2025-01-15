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
import styles from './QuestionPage.module.css'; 

const QuestionPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const dispatch = useAppDispatch();
  const answers = useAppSelector(selectAnswers);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const task = useAppSelector((state) => state.tasks.selectedTask);

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
    <Box className={styles.container}>
      <Box className={styles.questionsContainer}>
        <Typography variant="h4" gutterBottom>
          {task?.title}
        </Typography>
        {filteredAnswers.map((answer) => (
          <Button
            key={answer.id}
            variant="contained"
            onClick={() => handleAnswerClick(answer.id, answer.isCorrect)}
            className={styles.answerButton}
            sx={{
              backgroundColor: getBackgroundColor(answer),
            }}
          >
            {answer.content}
          </Button>
        ))}
      </Box>
      <Box className={styles.imageContainer}>
        <img 
          src="/imgs/questionheg.jpeg" 
          alt="Main Image" 
        />
      </Box>
    </Box>
  );
};

export default QuestionPage;
