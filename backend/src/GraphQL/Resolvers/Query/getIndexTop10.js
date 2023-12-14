const TaskSolution = require("../../../DataBase/Models/taskSolutions");

const indexTop10Resolver = {
    Query: {
        getIndexTop10: async (_, __) => {

            try {
                const python = await TaskSolution.aggregate([
                    { $match: { language: "Python" } },
                    { $sort: { createdAt: -1 } },
                    { $limit: 10 }
                ]);
                const javascript = await TaskSolution.aggregate([
                    { $match: { language: "JavaScript" } },
                    { $sort: { createdAt: -1 } },
                    { $limit: 10 }
                ]);
                const csharp = await TaskSolution.aggregate([
                    { $match: { language: "C#" } },
                    { $sort: { createdAt: -1 } },
                    { $limit: 10 }
                ]);
                const java = await TaskSolution.aggregate([
                    { $match: { language: "Java" } },
                    { $sort: { createdAt: -1 } },
                    { $limit: 10 }
                ]);

                return {
                    python: JSON.stringify(python),
                    javascript,
                    csharp,
                    java,
                    status: {
                        message: 'Tasks results fetched successfully',
                        code: 200,
                    },
                };
            } catch (error) {
                console.error('Error fetching index top 10 task result:', error);
                return {
                    status: {
                        message: 'Error fetching tasks results',
                        code: 500,
                    },
                };
            }
        },
    },
};

module.exports = indexTop10Resolver;
