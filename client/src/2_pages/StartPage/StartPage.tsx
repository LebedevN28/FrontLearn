import React from 'react';
import { useAppSelector } from '../../6_shared/lib/hooks';
import styles from './StartPage.module.css';
import PhaseCard from '../../4_features/PhaseCard/PhaseCard';




export default function StartPage(): React.JSX.Element {
  const modules = useAppSelector((store) => store.modules.modules);

  return (

  
    <div className={styles.container}>
      <h1 className={styles.title}>Выбери Фазу</h1>
      <div className={styles.phaseCardContainer}>
        {modules.map((module) => (
          <PhaseCard key={module.id} module={module} />
        ))}
      </div>
      <img
        src="/imgs/startpage.jpg"
        alt="Start Page"
        className={styles.image}
      />
    </div>
  );
}
