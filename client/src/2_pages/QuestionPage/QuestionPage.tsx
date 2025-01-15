import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../6_shared/lib/hooks';
import { getAnswersByTask } from '../../5_entities/answer/model/answerThunks';
import { getTaskByIdThunk, getTasksByModuleIdThunk } from '../../5_entities/task/model/taskThunk';
import { useHandleAnswer } from '../../4_features/hooks/useHandleAnswer';
import { useHandleNavigation } from '../../4_features/hooks/useHandleNavigation';
import { AnswerButtons } from '../../4_features/components/AnswerButtons';

const QuestionPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const dispatch = useAppDispatch();

  const answers = useAppSelector((state) => state.answers.answers);
  const task = useAppSelector((state) => state.tasks.selectedTask);
  const thisModuleTasks = useAppSelector((state) => state.tasks.tasks);
  const thisUser = useAppSelector((state) => state.user.selectedUser);
  const achievements = useAppSelector((state) => state.achievements.achievements);
  const userStats = useAppSelector((state) => state.user.stats);

  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);

  useEffect(() => {
    if (task?.moduleId) {
      dispatch(getTasksByModuleIdThunk(Number(task.moduleId)));
    }
  }, [task, dispatch]);

  useEffect(() => {
    if (taskId) {
      dispatch(getTaskByIdThunk(Number(taskId)));
      dispatch(getAnswersByTask(Number(taskId)));
    }
  }, [dispatch, taskId]);

  const handleAnswerClick = useHandleAnswer({ task, userStats, thisUser, achievements });
  const handleNextTask = useHandleNavigation(thisModuleTasks, task);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        {task?.title || 'Loading Task...'}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <AnswerButtons
          answers={answers.filter((answer) => answer.taskId === Number(taskId))}
          selectedAnswerId={selectedAnswerId}
          handleAnswerClick={(answer) => {
            setSelectedAnswerId(answer.id);
            handleAnswerClick(answer);
          }}
        />
        {selectedAnswerId && (
          <Button
            variant="contained"
            onClick={handleNextTask}
            sx={{ marginTop: 2, textTransform: 'none', backgroundColor: 'secondary.main' }}
          >
            Следующий вопрос
          </Button>
        )}
      </Box>
      <img 
          src="/imgs/questionheg.jpeg" 
          alt="Main Image" 
          height='500px'
          width='500px'
        />
    </Box>
  );
};

export default QuestionPage;
