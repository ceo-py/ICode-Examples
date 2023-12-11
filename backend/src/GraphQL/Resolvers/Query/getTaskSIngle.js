const TaskSolution = require("../../../DataBase/Models/taskSolutions");
const UserDetail = require("../../../DataBase/Models/userDetails");
const User = require("../../../DataBase/Models/users");
const { getCodeContent } = require("../../../GitHub/gihubApiRequest");



const getTaskSingleDetailsResolver = {
    Query: {
        getTaskSingleDetails: async (_, { input }, { res, req }) => {

            const result = await TaskSolution.findOne({ "_id": input.id })
            const user = await User.findOne({ "_id": result.id })
            const userDetail = await UserDetail.findOne({ "id": result.id })
            let [follow, like] = [true, true]

            console.log(userDetail)

            const cookieToken = req?.cookies?.token;
            if (!cookieToken) {
                follow = false
                like = false
            }

            const codeContent = await getCodeContent(result.githubLink)

            // console.log('Code Result: \n', result)
            // console.log('Code Content: \n', codeContent)
            if (codeContent?.status) {
                return {
                    status: {
                        code: codeContent.status,
                        message: codeContent.response.data.message
                    }
                }
            }
            return {
                follow,
                like,
                userDetails: { id: user._id, username: user.username },
                content: codeContent,
                icon: userDetail.icon,
                taskName: result.taskName,
                status: {
                    code: 200,
                    message: "Successful Found Task"
                }
            }
        },
    },
};

module.exports = getTaskSingleDetailsResolver;
