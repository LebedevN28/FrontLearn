// components/AnswerButtons.tsx
import React from 'react';
import { Button } from '@mui/material';
import type { AnswerType } from '../../5_entities/answer/model/answer.types';

// Функция для определения цвета кнопки
const getButtonColor = (isSelected: boolean, isCorrect: boolean): string => {
  if (isSelected) {
    return isCorrect ? 'green' : 'red'; // Цвет для выбранного ответа
  }
  return 'primary.main'; // Цвет по умолчанию
};

// Функция для определения цвета отключенной кнопки
const getDisabledButtonColor = (isSelected: boolean, isCorrect: boolean): string => {
  if (isSelected) {
    return isCorrect ? 'green' : 'red'; // Цвет для выбранного ответа (даже если отключен)
  }
  return 'grey'; // Цвет для невыбранных отключенных кнопок
};

export const AnswerButtons: React.FC<{
  answers: AnswerType[];
  selectedAnswerId: number | null;
  handleAnswerClick: (answer: AnswerType) => void;
  isDisabled: boolean;
}> = ({ answers, selectedAnswerId, handleAnswerClick, isDisabled }) => (
  <>
    {answers.map((answer) => {
      const isSelected = selectedAnswerId === answer.id;

      return (
        <Button
          key={answer.id}
          variant="contained"
          onClick={() => handleAnswerClick(answer)}
          disabled={isDisabled} // Отключаем все кнопки, если ответ выбран
          sx={{
            textTransform: 'none',
            fontSize: '20px',
            backgroundColor: getButtonColor(isSelected, answer.isCorrect), // Цвет кнопки
            color: 'white',
            '&:disabled': {
              backgroundColor: getDisabledButtonColor(isSelected, answer.isCorrect), // Цвет отключенной кнопки
              color: isSelected ? 'white' : 'lightgrey', // Цвет текста
            },
          }}
        >
          {answer.content}
        </Button>
      );
    })}
  </>
);
