const TaskSolution = require("../../../DataBase/Models/taskSolutions");


const getTaskSingleDetailsResolver = {
    Query: {
        getTaskSingleDetails: async (_, { input }) => {
            console.log(input.id)
            const result = await TaskSolution.find({"_id": input.id})
            return {
                content: JSON.stringify(result),
                status: {
                    code: 200,
                    message: "Successful Found Task"
                }
            }
        },
    },
};

module.exports = getTaskSingleDetailsResolver;
