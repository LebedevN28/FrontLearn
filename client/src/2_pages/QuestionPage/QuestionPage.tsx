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
import styles from './QuestionPage.module.css'; 
// import ProgressBar from '../../4_features/ProgressBar/ProgressBar'; 

const QuestionPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const dispatch = useAppDispatch();
  const answers = useAppSelector(selectAnswers);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const task = useAppSelector((state) => state.tasks.selectedTask);
  const thisModuleTasks = useAppSelector((state) => state.tasks.tasks);
  const thisUser = useAppSelector((state) => state.user.selectedUser);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  // const [progress, setProgress] = useState<number>(0); 
  const navigate = useNavigate();

  const getBackgroundColor = (answer: AnswerType): string => {
    if (selectedAnswerId === answer.id) {
      return answer.isCorrect ? 'green' : 'red';
    }
    return '#3f51b5';
  };

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

  const handleAnswerClick = (answer: AnswerType): void => {
    setSelectedAnswerId(answer.id);
    if (answer.isCorrect && thisUser) {
      let points;
      if (task?.difficulty === 'easy') points = 10;
      else if (task?.difficulty === 'medium') points = 20;
      else points = 30;
      const { id } = thisUser;
      dispatch(updateUserPointsThunk({ id, points })).catch(console.log);

      // const totalTasks = thisModuleTasks.length;
      // const completedTasks = thisModuleTasks.filter((t) => t.id <= Number(taskId)).length;
      // const newProgress = (completedTasks / totalTasks) * 100;
      // setProgress(newProgress); - движение прогресс бара
    }
  };

  const handleNextTask = (): void => {
    const nextTask = task ? thisModuleTasks.find((t) => t.id === task.id + 1) : null;
    if (nextTask) {
      void navigate(`/task/${String(nextTask.id)}`);
    } else {
      void navigate(`/tasks/${String(task?.moduleId)}`);
    }
  };

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  if (status === 'failed') {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box className={styles.container}>
      {/* <ProgressBar progress={progress} />  */}
      <Box className={styles.questionsContainer}>
        <Typography variant="h4" gutterBottom>
          {task?.title}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredAnswers.map((answer) => (
            <Button
              key={answer.id}
              variant="contained"
              onClick={() => handleAnswerClick(answer)}
              sx={{
                textTransform: 'none',
                backgroundColor: getBackgroundColor(answer),
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
              className={styles.nextButton}
            >
              Следующий вопрос
            </Button>
          )}
        </Box>
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
