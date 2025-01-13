import React from 'react';
import { useAppSelector } from '../../6_shared/lib/hooks';
import styles from './StartPage.module.css'; 
import PhaseCard from '../../4_features/PhaseCard/PhaseCard';

export default function StartPage(): React.JSX.Element {
  const modules = useAppSelector((store) => store.modules.modules);

  return (
    <div>
      <h1>Выбери Фазу</h1>
      <div className={styles['phase-card-container']}>
        {modules.map((module) => (
          <PhaseCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}
