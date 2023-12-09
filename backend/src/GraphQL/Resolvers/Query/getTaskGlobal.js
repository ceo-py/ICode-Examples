const TaskSolution = require("../../../DataBase/Models/taskSolutions");


const getTaskGlobalResolver = {
    Query: {
        getTaskGlobal: async (_, { input }) => {
            console.log(input.taskName)
            const result = await TaskSolution.find({"taskName": {"$regex": new RegExp(input.taskName, 'i')}})
            console.log(result.length)
            return {
                result: JSON.stringify(result),
                status: {
                    code: 200,
                    message: "Successful Search"
                }
            }
        },
    },
};

module.exports = getTaskGlobalResolver;
