import React from 'react';
import { Container } from 'react-bootstrap';

export default function RezultPage(): React.JSX.Element {
  return (
    <Container>
      <Container
        style={{
          backgroundColor: 'LightSlateGray',
          marginTop: '50px',
          width: '80%',
          height: '60vh',
          borderRadius: '20px',
          padding: '20px',
        }}
      >
        <h1
          style={{
            fontSize: '20px',
            color: 'Moccasin',
            textAlign: 'center',
            border: 'black',
          }}
        >
          Игра окончена. Благодарим за участие
        </h1>
        <h2
          style={{
            color: 'DarkOrange',
            fontSize: '40px',
            textAlign: 'center',
          }}
        >
          Результаты игры
        </h2>
      </Container>
    </Container>
  );
}
