const TaskSolution = require("../../../DataBase/Models/taskSolutions");


const getTaskGlobalResolver = {
    Query: {
        getTaskGlobal: async (_, { input }) => {
            try {
                const result = await TaskSolution.find({ "taskName": { "$regex": new RegExp(input.taskName, 'i') } })
                return {
                    result: JSON.stringify(result),
                    status: {
                        code: 200,
                        message: "Successful Search"
                    }
                }
            } catch (e) {
                console.log('Task Global Search:\n', e)
                return {
                    status: {
                        code: 500,
                        message: "Unsuccessful Search"
                    }
                }
            }
        },
    },
};

module.exports = getTaskGlobalResolver;
