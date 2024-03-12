const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ "port": 5001 });

module.exports = wss;