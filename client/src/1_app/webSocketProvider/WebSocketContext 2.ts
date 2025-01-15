import { createContext } from 'react';

/* eslint-disable @typescript-eslint/no-empty-function */
const WebSocketContext = createContext<{ sendData: (text: string) => void }>({
  sendData: () => {},
});
/* eslint-enable @typescript-eslint/no-empty-function */

export default WebSocketContext;
