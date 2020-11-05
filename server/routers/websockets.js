const WebSocket = require('ws');

// Used to store the active websocket servers
const WS_SERVERS = {};

// Broadcast any data received from one client back to all clients
const broadcast = (portNum,clientId,data) => {
  // console.log(WS_SERVERS[portNum].clients)
  WS_SERVERS[portNum].clients.forEach((client) => {
    // Only send the data to a client if they have an open connection
    // console.log(client , WebSocket)
    if (client.readyState === WebSocket.OPEN) {
      client.send(`${data}`);
    }
  });
};

// Create a Websocket server on the specified port number
const createServer = (portNum) => {
  // Start a server on the specified port
  const SERVER = new WebSocket.Server({ port: portNum });
  // Upon creating a connection wait to receive a message from a client
  SERVER.on('connection', (websocket) => {
    // websocket.id = 'Billy '
    websocket.on('message', (message) => {
      // Upon receiving a message, broadcast the message to all clients
      console.log("hello my message is: ",message);
      broadcast(portNum,websocket.id, message);
    });
  });
  WS_SERVERS[portNum] = SERVER;
};

module.exports = { createServer };

