const TaskSolution = require("../../../DataBase/Models/taskSolutions");


const getModuleExamplesResolver = {
    Query: {
        getModuleExamples: async (_, { input }) => {

            
            try {
                const result = await TaskSolution.find({
                    $and: [
                        { "language": input.language  },
                        { "course": input.course  },
                        { "module": input.module  },
                    ]
                });
                return {
                    result: JSON.stringify(result),
                    status: {
                        code: 200,
                        message: "Successful Module Search"
                    }
                }
            } catch (e) {
                console.log('Error Module Search:\n', e)
                return {
                    status: {
                        code: 500,
                        message: "Error unsuccessful search"
                    }
                }
            }
        },
    },
};

module.exports = getModuleExamplesResolver;
