import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingSpinner(): React.JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Spinner
        style={{
          height: '100px',
          width: '100px',
        }}
        animation="grow"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
