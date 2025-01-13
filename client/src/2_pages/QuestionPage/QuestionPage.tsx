import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import {
  selectAnswers,
  selectStatus,
  selectError,
} from '../../5_entities/answer/model/answerSlice';
import { useAppDispatch, useAppSelector } from '../../6_shared/lib/hooks';
import { getAnswersByTask } from '../../5_entities/answer/model/answerThunks';
import { getTaskByIdThunk, getTasksByModuleIdThunk } from '../../5_entities/task/model/taskThunk';
import type { AnswerType } from '../../5_entities/answer/model/answer.types';
import { updateUserPointsThunk } from '../../5_entities/user/model/userThunks';

const QuestionPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const answers = useAppSelector(selectAnswers);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const task = useAppSelector((state) => state.tasks.selectedTask);
  const thisModuleTasks = useAppSelector((state) => state.tasks.tasks);
  const thisUser = useAppSelector((state) => state.user.selectedUser);

  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);

  useEffect(() => {
    if (task?.moduleId) {
      dispatch(getTasksByModuleIdThunk(Number(task.moduleId))).catch(console.log);
    }
  }, [task, dispatch]);

  useEffect(() => {
    if (taskId) {
      dispatch(getTaskByIdThunk(Number(taskId))).catch(console.log);
      dispatch(getAnswersByTask(Number(taskId))).catch(console.log);
    }
  }, [dispatch, taskId]);

  const filteredAnswers = answers.filter((answer) => answer.taskId === Number(taskId));

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

    if (answer.isCorrect && thisUser) {
      const points = task ? calculatePoints(task.difficulty) : 0;
      const { id } = thisUser;
      dispatch(updateUserPointsThunk({ id, points })).catch(console.log);
    }
  };

  const handleNextTask = (): void => {
    const currentIndex = thisModuleTasks.findIndex((t) => t.id === task?.id);
    const nextTask = thisModuleTasks[currentIndex + 1];

    if (nextTask) {
      navigate(`/task/${String(nextTask.id)}`);
    } else {
      navigate(`/tasks/${String(task?.moduleId)}`);
    }
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

        {selectedAnswerId && (
          <Button
            variant="contained"
            onClick={handleNextTask}
            sx={{
              textTransform: 'none',
              backgroundColor: 'secondary.main',
              color: 'white',
              marginTop: 2,
            }}
          >
            Следующий вопрос
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default QuestionPage;
