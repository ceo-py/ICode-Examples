const { WebSocketServer } = require('ws');
const jwt = require('jsonwebtoken');
const Reports = require('./DataBase/Models/reports');


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

const deleteReport = async (reportId) => {

    try {
        await Reports.deleteOne({ _id: reportId })

    } catch (e) {
        console.log('DeleteReport:\n', e);
    }

}

wss.on('connection', async (ws, req) => {

    try {
        const userId = getUserIdFromCookie(req?.headers?.cookie);

        if (!userId) {
            console.error('User ID not found in the cookie');
            ws.close();
            return;
        }

        userConnections.set(userId, ws);
        ws.on('message', (message) => {
            deleteReport(JSON.parse(message))
            console.log(`Received message from user ${userId}:`, JSON.parse(message));
            ws.send(JSON.stringify("Report Deleted"))
        });

        ws.on('close', () => {
            console.log(`User ${userId} disconnected`);
            userConnections.delete(userId);
        });
    } catch (e) {
        console.log("WebSocketServer:\n", e)
    }
    return {
        message: 'Internal server error',
        code: 500
    }

});

module.exports = { wss, userConnections };
