import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../6_shared/lib/hooks';
import { getAnswersByTask } from '../../5_entities/answer/model/answerThunks';
import {
  getAllTasksInModuleThunk,
  getTaskByIdThunk,
  getTasksByModuleIdThunk,
} from '../../5_entities/task/model/taskThunk';
import { useHandleAnswer } from '../../4_features/hooks/useHandleAnswer';
import { useHandleNavigation } from '../../4_features/hooks/useHandleNavigation';
import { AnswerButtons } from '../../4_features/components/AnswerButtons';
import styles from './QuestionPage.module.css'; // Импортируем стили как объект
import ProgressBar from '../../4_features/ProgressBar/ProgressBar';

const QuestionPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const dispatch = useAppDispatch();

  const answers = useAppSelector((state) => state.answers.answers);
  const task = useAppSelector((state) => state.tasks.selectedTask);
  const thisModuleTasks = useAppSelector((state) => state.tasks.tasks);
  const thisModuleTasksAll = useAppSelector((state) => state.tasks.tasksInModule);
  const thisUser = useAppSelector((state) => state.user.selectedUser);
  const userModuleProgress = useAppSelector((state) => state.progress.progressModule);
  const achievements = useAppSelector((state) => state.achievements.achievements);
  const userStats = useAppSelector((state) => state.user.stats);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [isAnswerSelected, setIsAnswerSelected] = useState<boolean>(false);

  const progress = (userModuleProgress.length / thisModuleTasksAll.length) * 100;
  console.log(userModuleProgress.length, thisModuleTasksAll.length);

  useEffect(() => {
    if (task?.moduleId) {
      dispatch(getTasksByModuleIdThunk({ moduleId: Number(task.moduleId), difficulty: '' })).catch(
        console.log,
      );
      dispatch(getAllTasksInModuleThunk({ moduleId: Number(task.moduleId), difficulty: '' })).catch(
        console.log,
      );
    }
  }, [task, dispatch]);

  useEffect(() => {
    if (taskId) {
      dispatch(getTaskByIdThunk(Number(taskId))).catch(console.log);
      dispatch(getAnswersByTask(Number(taskId))).catch(console.log);
    }
  }, [dispatch, taskId]);

  const handleAnswerClick = useHandleAnswer({ task, userStats, thisUser, achievements });
  const handleNextTask = useHandleNavigation(thisModuleTasks, task);
  const handleNext = async (): Promise<void> => {
    await handleNextTask(); // Переходим на следующий вопрос
    setSelectedAnswerId(null); // Сбрасываем выбранный ответ
    setIsAnswerSelected(false); // Сбрасываем состояние отключения кнопок
  };

  return (
    <>
      <ProgressBar progress={progress} />
      <p>Фаза: {task?.moduleId}</p>
      <Box className={styles.container}>
        <Box className={styles.questionsContainer}>
          <Typography variant="h4" gutterBottom>
            {task?.title ?? 'Loading Task...'}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <AnswerButtons
              answers={answers.filter((answer) => answer.taskId === Number(taskId))}
              selectedAnswerId={selectedAnswerId}
              isDisabled={isAnswerSelected}
              handleAnswerClick={(answer) => {
                setSelectedAnswerId(answer.id);
                setIsAnswerSelected(true);
                handleAnswerClick(answer);
              }}
            />
            {selectedAnswerId && (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ marginTop: 2, textTransform: 'none', backgroundColor: 'secondary.main' }}
              >
                Следующий вопрос
              </Button>
            )}
          </Box>
        </Box>
        <Box className={styles.imageContainer}>
          <img src="/imgs/questionheg.jpeg" alt="Main Image" className={styles.image} />
        </Box>
      </Box>
    </>
  );
};

export default QuestionPage;
