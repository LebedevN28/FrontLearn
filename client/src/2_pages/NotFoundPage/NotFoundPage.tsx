import React from 'react';
import styles from './NotFoundPage.module.css'; // Импортируем стили

export default function NotFoundPage(): React.JSX.Element {
  return (
    <div className={styles.container}>
      <img src="/imgs/4hogs.jpeg" alt="Ошибка 404" className={styles.image} />
      <h2 className={styles.title}>Ты зашел не в ту дверь...Артем</h2>
    </div>
  );
}