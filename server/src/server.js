const app = require('./app');
const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const validateCookie = require('./middlewares/validateCookie');
const connection = require('./websocket/connection');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

function onSocketError(err) {
  console.error(err);
}

const server = createServer(app);
const wss = new WebSocketServer({ noServer: true });
// соединение
wss.on('connection', connection);

server.on('upgrade', (request, socket, head) => {
  socket.on('error', onSocketError);

  validateCookie(request, (err, user) => {
    if (err || !user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    socket.removeListener('error', onSocketError);

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request, user);
    });
  });
});
server.listen(PORT, () => {
  console.log(`API Сервер запущен на порту ${PORT}`);
});
