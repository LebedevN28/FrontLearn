import React from 'react';
import { useAppSelector } from '../../6_shared/lib/hooks';
import LeaderCard from '../../4_features/leaderCard/LeaderCard';
import styles from './LeaderboardPage.module.css';

export default function LeaderboardPage(): React.JSX.Element {
  const users = useAppSelector((store) => store.user.users);
  const onlineUsers = useAppSelector((store) => store.userState.users);

  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  return (
    <div className={styles.leaderboardPage}>
      <div className={styles.imageContainer}>
        <img
          src="/imgs/leader.jpeg" 
          alt="Leaderboard Background"
        />
      </div>
      <div className={styles.cardContainer}>
        <h1 className="text-2xl font-bold text-center text-gray-800">Рейтинг игроков</h1>
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
  );
}
