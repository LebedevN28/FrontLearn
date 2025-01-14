// components/AnswerButtons.tsx
import React from 'react';
import { Button } from '@mui/material';
import type { AnswerType } from '../../5_entities/answer/model/answer.types';

export const AnswerButtons: React.FC<{
  answers: AnswerType[];
  selectedAnswerId: number | null;
  handleAnswerClick: (answer: AnswerType) => void;
}> = ({ answers, selectedAnswerId, handleAnswerClick }) => (
  <>
    {answers.map((answer) => (
      <Button
        key={answer.id}
        variant="contained"
        onClick={() => handleAnswerClick(answer)}
        sx={{
          textTransform: 'none',
          backgroundColor:
            selectedAnswerId === answer.id ? (answer.isCorrect ? 'green' : 'red') : 'primary.main',
          color: 'white',
        }}
      >
        {answer.content}
      </Button>
    ))}
  </>
);
