import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import styles from './QuestionPage.module.css';
// import myImage from '../../../../public/images/questionheg.jpeg'

const questions = [
  {
    id: 1,
    title: 'Что такое React?',
    answers: [
      {
        id: 1,
        taskId: 1,
        content: 'JavaScript library for building UIs',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        taskId: 1,
        content: 'A programming language',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        taskId: 1,
        content: 'A database management system',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        taskId: 1,
        content: 'A design framework',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
];

export default function QuestionPage(): React.JSX.Element {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const handleAnswerClick = (answerId: number, isCorrect: boolean) => {
    setSelectedAnswer(answerId);
    setIsAnswerCorrect(isCorrect);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Typography variant="h3" className={styles.question}>
          {questions[0].title}
        </Typography>
        <div className={styles.answersGrid}>
          {questions[0].answers.map((answer) => (
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
            {/* {isAnswerCorrect ? 'Правильно! 🎉' : 'Неправильно 😢'} */}
          </Typography>
        )}
      </div>
      <div className={styles.imageContainer}>
        <img
          src='/imgs/questionheg.jpeg' 
          alt="Placeholder"
          className={styles.image}
        />
      </div>
    </div>
  );
}
