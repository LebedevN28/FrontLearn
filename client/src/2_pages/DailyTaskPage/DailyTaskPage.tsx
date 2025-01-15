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
  // const user = useAppSelector((state) => state.user.selectedUser);
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

  const handleAnswerClick = (answer: AnswerType): void => {
    setSelectedAnswerId(answer.id);

    if (thisUser) {
      if (answer.isCorrect) {
        const points = task ? calculatePoints(task.difficulty) : 0;
        setEarnedPoints(points);
        setModalOpen(true);
        const { id } = thisUser;
        dispatch(updateUserPointsThunk({ id, points })).catch(console.log);
      } else {
        setModalOpen(true);
        setEarnedPoints(0); // Нет заработанных очков
      }
    }
  };

  const handleCloseModal = (): void => {
    setModalOpen(false);
    navigate('/');
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

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        {task.title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredAnswers.map((answer) => (
          <Button
            key={answer.id}
            variant="contained"
            onClick={() => handleAnswerClick(answer)}
            sx={{
              textTransform: 'none',
              backgroundColor:
                selectedAnswerId === answer.id
                  ? answer.isCorrect
                    ? 'green'
                    : 'red'
                  : 'primary.main',
              color: 'white',
            }}
          >
            {answer.content}
          </Button>
        ))}
      </Box>

      <CongratModal open={isModalOpen} onClose={handleCloseModal} points={earnedPoints} />
    </Box>
  );
};

export default DailyTaskPage;
