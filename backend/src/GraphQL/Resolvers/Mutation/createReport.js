const jwt = require('jsonwebtoken');
const Reports = require('../../../DataBase/Models/reports');
const { wss, userConnections } = require('../../../websocketServer');
const Notification = require('../../../DataBase/Models/notofications');


const createReportResolver = {
    Mutation: {
        createReport: async (_, { input }, { req, res }) => {

            const cookieToken = req?.cookies?.token;
            if (!input.idReportType || !input.typeReport || !input.reportContent) {
                return {
                    code: 401,
                    message: 'Missing report details'
                }
            }
            try {
                const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);
                const report = new Reports({
                    idReportType: input.idReportType,
                    typeReport: input.typeReport,
                    userIdReport: decoded.userId,
                    reportContent: input.reportContent.trim(),
                })
                await report.save()

                const notification = new Notification({
                    taskId: input.idReportType,
                    type: "Report",
                })

                await notification.save()
                userConnections.get(decoded.userId).send(JSON.stringify(input.reportContent.trim()));

                return {
                    code: 200,
                    message: 'Create report successfully'
                };

            } catch (e) {
                console.error('Create report error:\n', e)
                return {
                    code: 401,
                    message: 'Create report unsuccessfully'
                }
            }
        }
    }
};

module.exports = createReportResolver;
