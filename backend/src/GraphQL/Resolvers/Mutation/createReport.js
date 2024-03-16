const jwt = require("jsonwebtoken");
const Reports = require("../../../DataBase/Models/reports");
const { userConnections } = require("../../../websocketServer");

const createReportResolver = {
  Mutation: {
    createReport: async (_, { input }, { req, res }) => {
      const cookieToken = req?.cookies?.token;
      if (!input.idReportType || !input.typeReport || !input.reportContent) {
        return {
          code: 401,
          message: "Missing report details",
        };
      }
      try {
        const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);
        const report = new Reports({
          idReportType: input.idReportType,
          typeReport: input.typeReport,
          userIdReport: decoded.userId,
          reportContent: input.reportContent.trim(),
        });
        await report.save();

        const admin = userConnections.get(process.env.ADMIN_USER);
        admin?.send("Report created");

        return {
          code: 200,
          message: "Create report successfully",
        };
      } catch (e) {
        console.error("Create report error:\n", e);
        return {
          code: 401,
          message: "Create report unsuccessfully",
        };
      }
    },
  },
};

module.exports = createReportResolver;
