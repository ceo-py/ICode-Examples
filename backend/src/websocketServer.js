const { WebSocketServer } = require('ws');
const jwt = require('jsonwebtoken');


const wss = new WebSocketServer({ port: 5001 });
const userConnections = new Map();

const getUserIdFromCookie = (rawCookie) => {
    const regex = /token=(.*?);/g;
    const matches = [];
    let match;
    while ((match = regex.exec(rawCookie)) !== null) {
        matches.push(match[1]);
    }
    if (matches.length === 0) return
    return jwt.verify(matches[0], process.env.SECRET_KEY).userId;
}

wss.on('connection', (ws, req) => {

    try {
        const userId = getUserIdFromCookie(req?.headers?.cookie);

        if (!userId) {
            console.error('User ID not found in the cookie');
            ws.close();
            return;
        }

        userConnections.set(userId, ws);
        ws.on('message', (message) => {
            console.log(`Received message from user ${userId}:`, message);
        });

        ws.on('close', () => {
            console.log(`User ${userId} disconnected`);
            userConnections.delete(userId); 
        });
    } catch (e) {
        console.log("WebSocketServer:\n", e)
    }

});

module.exports = { wss, userConnections };
