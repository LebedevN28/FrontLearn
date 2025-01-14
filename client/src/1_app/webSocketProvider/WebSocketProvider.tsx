import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import WebSocketContext from './WebSocketContext';
import { useAppDispatch, useAppSelector } from '../../6_shared/lib/hooks';
import { AuthStatus } from '../../4_features/auth/model/auth.types';
import actionSchema from '../../4_features/userState/model/actionSchema';

type WebSocketProviderProps = {
  children: React.JSX.Element;
};

export default function WebSocketProvider({ children }: WebSocketProviderProps): React.JSX.Element {
  const socketRef = useRef<WebSocket>(null);
  const status = useAppSelector((store) => store.auth.data.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === AuthStatus.authenticated) {
      function socketInit(): void {
        const socket = new WebSocket('http://localhost:3000');

        socket.onopen = () => console.log('Socket opened');
        socket.onclose = () => {
          console.log('Socket closed');
          setTimeout(socketInit, 3000);
        };
        socket.onerror = () => console.error('Socket error');
        socket.onmessage = (message) => {
          const action = actionSchema.parse(JSON.parse(message.data as string));
          console.log(`Получено сообщение:`, action);
          dispatch(action);
        };

        socketRef.current = socket;
      }

      socketInit();
    }
  }, [status, dispatch]); // Добавляем `dispatch` в зависимости

  const sendData = useCallback((text: string) => {
    const socket = socketRef.current;
    if (!socket) return;
    const action = {
      type: 'NEW_CHATMES',
      payload: text,
    };
    socket.send(JSON.stringify(action));
  }, []);

  const contextData = useMemo(() => ({ sendData }), [sendData]);

  return <WebSocketContext.Provider value={contextData}>{children}</WebSocketContext.Provider>;
}
