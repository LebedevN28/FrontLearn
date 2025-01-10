import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getAnswersByTask } from '../../../5_entities/answer/model/answerThunks'
import styles from './QuestionPage.module.css';
import myImage from '../../../../public/images/questionheg.jpeg';
import { useAppSelector } from '../../../6_shared/lib/hooks';

const QuestionPage = () => {
  const dispatch = useDispatch();
  const { answers, status, error } = useSelector((state) => state.answers);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const title = useAppSelector((store) =>store.tasks.selectedTask?.title )

  useEffect(() => {
    dispatch(getAnswersByTask(1)); 
  }, [dispatch]);

  const handleAnswerClick = (answerId: number, isCorrect: boolean) => {
    setSelectedAnswer(answerId);
    setIsAnswerCorrect(isCorrect);
  };

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  if (status === 'failed') {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Typography variant="h3" className={styles.question}>
          
        </Typography>
        <div className={styles.answersGrid}>
          {answers.map((answer) => (
            <Button
              key={answer.id}
              variant="contained"
              onClick={() => handleAnswerClick(answer.id, answer.isCorrect)}
              sx={{
                padding: '30px',
                fontSize: '16px',
                backgroundColor: '#3f51b5',
                color: '#fff',
                textTransform: 'none',
                borderRadius: '10px',
                transition: 'background-color 0.3s ease',
                '&.correct': {
                  backgroundColor: '#4caf50',
                },
                '&.incorrect': {
                  backgroundColor: '#f44336',
                },
              }}
              className={
                selectedAnswer === answer.id
                  ? isAnswerCorrect
                    ? 'correct'
                    : 'incorrect'
                  : ''
              }
            >
              {answer.content}
            </Button>
          ))}
        </div>

        {selectedAnswer !== null && (
          <Typography
            variant="h5"
            className={`${styles.result} ${
              isAnswerCorrect ? styles.correct : styles.incorrect
            }`}
          >
          </Typography>
        )}
      </div>
      <div className={styles.imageContainer}>
        <img src={myImage} alt="Placeholder" className={styles.image} />
      </div>
    </div>
  );
};

export default QuestionPage;
