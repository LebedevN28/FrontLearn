import React from 'react';
import type { UserType } from '../../5_entities/user/model/user.types';
import styles from './LeaderCard.module.css';
import Avatar from '@mui/material/Avatar';

type LeaderCardProps = {
  user: UserType;
  index: number;
  isOnline: boolean;
};

export default function LeaderCard({ user, index, isOnline }: LeaderCardProps): React.JSX.Element {
  return (
    <div className={styles.card}>
      <p className={styles.index}>{index + 1}</p>

      <div className={styles.avatarContainer}>
        <div className={styles.avatar} style={{ borderColor: isOnline ? '#22c55e' : 'red' }}>
          {user.image ? (
            <Avatar
              alt={user.name}
              src={user.image ? `/images/${user.image}` : '/imgs/hog.png'}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              // className="h-full w-full object-cover rounded-full"
            />
          ) : (
            <div className={styles.fallback}>{user.name[0]}</div>
          )}
        </div>
      </div>

      <p className={styles.name}>
        {user.name}
        {isOnline && <span className={styles.onlineMarker}>в сети</span>}
      </p>

      <p className={styles.points}>{user.points} 💎</p>
    </div>
  );
}
