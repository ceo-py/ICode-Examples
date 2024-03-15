const { WebSocketServer } = require('ws');
const jwt = require('jsonwebtoken');
const Reports = require('./DataBase/Models/reports');
const Notification = require('./DataBase/Models/notifications');
const { parse } = require('cookie');


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

const commands = {
    deleteReport: async (reportId) => {
        try {
            await Reports.deleteOne({ _id: reportId })

        } catch (e) {
            console.log('deleteReport:\n', e);
        }
    },
    makeReadReport: async (reportId) => {
        try {
            await Reports.findByIdAndUpdate(reportId, { $set: { isRead: true } });

        } catch (e) {
            console.log('makeReadReport:\n', e);
        }
    },
    makeReadComment: async (commentId) => {
        try {
            await Notification.findByIdAndUpdate(commentId, { $set: { isRead: true } });

        } catch (e) {
            console.log('makeReadComment:\n', e);
        }
    },
    deleteComment: async (commentId) => {
        try {
            await Notification.deleteOne({ _id: commentId })

        } catch (e) {
            console.log('deleteComment:\n', e);
        }
    },
}


wss.on('connection', async (ws, req) => {
    try {
        const userId = jwt.verify(parse(req?.headers?.cookie).token, process.env.SECRET_KEY).userId;

        if (!userId) {
            console.error('User ID not found in the cookie');
            ws.close();
            return;
        }

        userConnections.set(userId, ws);
        ws.on('message', (message) => {
            const [command, userId] = JSON.parse(message).split(' ');
            if (commands.hasOwnProperty(command)) commands[command](userId)

            console.log(`Received message from user ${userId}:`, JSON.parse(message));
            if (command.includes("Report")) ws.send("Report")
            if (command.includes("Comment")) ws.send("Comment")
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
