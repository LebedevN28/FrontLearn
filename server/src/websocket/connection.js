const activeConnection = {};

function connection(ws, request, user) {
  ws.on('error', console.error);
  activeConnection[user.id] = { ws, user };

  function sendActiveUsers() {
    const userConnections = Object.values(activeConnection);
    userConnections.forEach((userConnection) => {
      const action = {
        type: 'chat/setUsers',
        payload: userConnections.map((c) => c.user),
      };
      userConnection.ws.send(JSON.stringify(action));
      
    });
  }
  ws.on('close', () => {
    delete activeConnection[user.id];
    sendActiveUsers();
  });
  sendActiveUsers();
}

module.exports = connection;
