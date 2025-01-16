import React, { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../6_shared/lib/hooks';
import { useNavigate } from 'react-router-dom';
import {
  selectAnswers,
  selectStatus,
  selectError,
} from '../../5_entities/answer/model/answerSlice';
import { getAnswersByTask } from '../../5_entities/answer/model/answerThunks';
import { getTaskByIdThunk } from '../../5_entities/task/model/taskThunk';
import { updateUserPointsThunk } from '../../5_entities/user/model/userThunks';
import CongratModal from '../../3_widgets/CongratModal/CongratModal';
import type { AnswerType } from '../../5_entities/answer/model/answer.types';
import styles from './DailyTaskPage.module.css';

const DailyTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const [taskId, setTaskId] = useState<number | null>(null);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  const dispatch = useAppDispatch();
  const answers = useAppSelector(selectAnswers);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const task = useAppSelector((state) => state.tasks.selectedTask);
  const thisUser = useAppSelector((state) => state.user.selectedUser);

  useEffect(() => {
    const randomTaskId = Math.floor(Math.random() * 81) + 1;
    setTaskId(randomTaskId);
  }, []);

  useEffect(() => {
    if (taskId) {
      dispatch(getTaskByIdThunk(taskId)).catch(console.log);
      dispatch(getAnswersByTask(taskId)).catch(console.log);
    }
  }, [dispatch, taskId]);

  const filteredAnswers = answers.filter((answer) => answer.taskId === taskId);

  const calculatePoints = (difficulty: string): number => {
    switch (difficulty) {
      case 'easy':
        return 10;
      case 'medium':
        return 20;
      default:
        return 30;
    }
  };

  const handleAnswer = (answer: AnswerType): void => {
    setSelectedAnswerId(answer.id);

    if (thisUser) {
      if (answer.isCorrect) {
        const points = task ? calculatePoints(task.difficulty) : 0;
        setEarnedPoints(points);
      } else {
        setEarnedPoints(0);
      }
      setModalOpen(true);

      if (answer.isCorrect) {
        const { id } = thisUser;
        dispatch(updateUserPointsThunk({ id, points })).catch(console.log);
      }
    }
  };

  const handleCloseModal = (): void => {
    setModalOpen(false);
    void navigate('/');
  };

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  if (status === 'failed') {
    return <Typography>Error: {error}</Typography>;
  }

  if (!task) {
    return <Typography>Task not found</Typography>;
  }

  // const getButtonClass = (answer: any): string => {
  //   if (selectedAnswerId === answer.id) {
  //     return answer.isCorrect ? styles.correctAnswer : styles.incorrectAnswer;
  //   }
  //   return '';
  // };

  return (
    <>
      <Box className={styles.container}>
        <Box className={styles.questionsContainer}>
          <Typography variant="h4" gutterBottom>
            {task.title}
          </Typography>
          <Box className={styles.answersContainer}>
            {filteredAnswers.map((answer) => (
              <Button
                key={answer.id}
                variant="contained"
                onClick={() => handleAnswer(answer)}
                className={`${styles.answerButton} ${
                  selectedAnswerId === answer.id
                    ? answer.isCorrect
                      ? styles.correctAnswer
                      : styles.incorrectAnswer
                    : ''
                }`}
              >
                {answer.content}
              </Button>
            ))}
          </Box>
        </Box>
        <Box className={styles.imageContainer}>
          <img src="/imgs/questionheg.jpeg" alt="Main Image" className={styles.image} />
        </Box>
      </Box>
      <CongratModal open={isModalOpen} onClose={handleCloseModal} points={earnedPoints} />
    </>
  );
};

export default DailyTaskPage;
