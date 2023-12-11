const TaskSolution = require("../../../DataBase/Models/taskSolutions");
const { getCodeContent } = require("../../../GitHub/gihubApiRequest");



const getTaskSingleDetailsResolver = {
    Query: {
        getTaskSingleDetails: async (_, { input }) => {
            const result = await TaskSolution.findOne({ "_id": input.id })

            const codeContent = await getCodeContent(result.githubLink)

            // console.log('Code Content', codeContent)
            if (codeContent?.status) {
                return {
                    status: {
                        code: codeContent.status,
                        message: codeContent.response.data.message
                    }
                }
            }
            return {
                content: codeContent,
                status: {
                    code: 200,
                    message: "Successful Found Task"
                }
            }
        },
    },
};

module.exports = getTaskSingleDetailsResolver;
