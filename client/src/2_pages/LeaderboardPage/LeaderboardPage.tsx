import React from 'react';
import { useAppSelector } from '../../6_shared/lib/hooks';
import LeaderCard from '../../4_features/leaderCard/LeaderCard';

export default function LeaderboardPage(): React.JSX.Element {
  const users = useAppSelector((store) => store.user.users);
  const onlineUsers = useAppSelector((store) => store.userState.users);

  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  return (
    <div className="flex flex-col space-y-4 p-4">
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
  );
}
