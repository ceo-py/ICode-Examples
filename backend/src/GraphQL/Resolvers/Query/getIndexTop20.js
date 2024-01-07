const TaskSolution = require("../../../DataBase/Models/taskSolutions");

const indexTop20Resolver = {
    Query: {
        getIndexTop20: async (_, __) => {
            const getLatestTasksByLanguage = async (language, limit = 20) => {
                try {
                    const result = await TaskSolution.aggregate([
                        { $match: { language } },
                        { $sort: { _id: -1 } },
                        { $limit: limit }
                    ]);
                    return JSON.stringify(result);
                } catch (error) {
                    console.error('Error fetching index top 20 task result:', error);
                    return {
                        status: {
                            message: 'Error fetching tasks results',
                            code: 500,
                        },
                    };
                }
            };
            try {
                const python = await getLatestTasksByLanguage("Python");
                const javascript = await getLatestTasksByLanguage("JavaScript");
                const csharp = await getLatestTasksByLanguage("C#");
                const java = await getLatestTasksByLanguage("Java");
                const cpp = await getLatestTasksByLanguage("C++");
                const totalSolutions = await TaskSolution.countDocuments({ "taskName": { "$regex": "." } });

                return {
                    python,
                    javascript,
                    csharp,
                    java,
                    cpp,
                    totalSolutions,
                    status: {
                        message: 'Tasks results fetched successfully',
                        code: 200,
                    },
                };
            } catch (error) {
                console.error('Error fetching index top 20 task result:', error);
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

module.exports = indexTop20Resolver;
