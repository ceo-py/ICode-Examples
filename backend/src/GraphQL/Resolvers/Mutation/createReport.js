const jwt = require('jsonwebtoken');
const Reports = require('../../../DataBase/Models/reports');


const createReportResolver = {
    Mutation: {
        createReport: async (_, { input }, { req, res }) => {
            const cookieToken = req?.cookies?.token;
            if (!input.id || !input.text) {
                return {
                    status: {
                        code: 401,
                        message: 'Missing report details'
                    }
                }
            }
            try {
                const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);
                const report = new Reports({
                    idReportType: input.idReportType,
                    typeReport: decoded.typeReport,
                    userIdReport: decoded.userId,
                    reportContent: input.reportContent.trim(),
                })
                await report.save()

                return {
                    status: {
                        code: 200,
                        message: 'Create report successfully'
                    },
                };

            } catch (e) {
                console.log('Create report error:\n', e)
                return {
                    status: {
                        code: 401,
                        message: 'Create report unsuccessfully'
                    }
                }
            }
        }
    }
};

module.exports = createReportResolver;
