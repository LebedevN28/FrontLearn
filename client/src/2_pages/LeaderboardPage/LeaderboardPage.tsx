import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../6_shared/lib/hooks';
import LeaderCard from '../../4_features/leaderCard/LeaderCard';
import { getAllUsersThunk } from '../../5_entities/user/model/userThunks';
import styles from './LeaderboardPage.module.css';

export default function LeaderboardPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);
  const onlineUsers = useAppSelector((state) => state.userState.users);

  useEffect(() => {
    dispatch(getAllUsersThunk()).catch(console.log);
  }, [dispatch]);

  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  return (
    <div className={styles.leaderboardPage}>
      {/* Контейнер для картинки слева */}
      <div className={styles.imageContainer}>
        <img src="/imgs/leader.jpeg" alt="Leaderboard Background" />
      </div>
      
      {/* Контейнер справа для заголовка и карточек */}
      <div className={styles.rightContainer}>
        <h1 className={styles.pageTitle}>Рейтинг игроков</h1>
        
        {/* Контейнер для карточек рейтинга */}
        <div className={styles.cardContainer}>
          {sortedUsers.map((user, index) => (
            <LeaderCard
              key={user.id}
              user={user}
              index={index}
              isOnline={onlineUsers.some((onlineUser) => onlineUser.id === user.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
