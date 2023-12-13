const Comments = require("../../../DataBase/Models/comments");
const TaskSolution = require("../../../DataBase/Models/taskSolutions");
const UserDetail = require("../../../DataBase/Models/userDetails");
const User = require("../../../DataBase/Models/users");
const { getCodeContent } = require("../../../GitHub/gihubApiRequest");
const timeTimeDifference = require("../../../utils/getTimeNow");



const getTaskSingleDetailsResolver = {
    Query: {
        getTaskSingleDetails: async (_, { input }, { res, req }) => {
            try {
                const result = await TaskSolution.findOne({ "_id": input.id });
                const user = await User.findOne({ "_id": result.id });
                const userDetail = await UserDetail.findOne({ "id": result.id });
                const findComments = await Comments.find({ "taskId": input.id }).sort({ createdAt: -1 });

                let [follow, like, comments] = [true, true, []]
                if (findComments) {
                    const commentsData = await Promise.all(
                        findComments.map(async (x) => {
                            const user = await UserDetail.findOne({ "id": x.createdById });

                            return {
                                timePast: `${timeTimeDifference(x.createdAt)} ago ${x?.updatedAt ? '(edited)' : ''}`,
                                username: x.username,
                                createdById: x.createdById,
                                commentId: x._id,
                                text: x.text,
                                icon: user.icon
                            };
                        })
                    );

                    comments = commentsData;

                }

                const cookieToken = req?.cookies?.token;
                if (!cookieToken) {
                    like = false
                    icon = null
                }

                const codeContent = await getCodeContent(result.githubLink)

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
                    taskId: input.id,
                    comments: comments.length !== 0 ? JSON.stringify(comments) : '',
                    status: {
                        code: 200,
                        message: "Successful Found Task"
                    }
                }
            } catch (e) {
                console.error('Error getTaskSingle', e)
                return {
                    status: {
                        code: 500,
                        message: "Unsuccessful Found Task"
                    }
                }
            }
        },
    },
};

module.exports = getTaskSingleDetailsResolver;
