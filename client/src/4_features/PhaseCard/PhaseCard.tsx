import React from 'react';
import type { ModuleType } from '../../5_entities/module/model/module.types';
import styles from './PhaseCard.module.css';

type PhaseCardProps = {
  module: ModuleType;
};

export default function PhaseCard({ module }: PhaseCardProps): React.JSX.Element {
  const handleModuleClick = () => {
    console.log(`Module ${module.id} clicked`);
  };

  return (
    <div
      className={`${styles['phase-card']} d-flex flex-column align-items-center`}
      onClick={handleModuleClick}
      title={module.title}
    >
      <img
        src="/imgs/apple.jpg" /* Общая картинка для всех */
        alt={module.title}
        className={styles['phase-card-image']}
      />
      <div className={styles['phase-card-title']}>{module.title}</div>
    </div>
  );
}
