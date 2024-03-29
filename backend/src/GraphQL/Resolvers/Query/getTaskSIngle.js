const Comments = require("../../../DataBase/Models/comments");
const Followers = require("../../../DataBase/Models/followers");
const Likes = require("../../../DataBase/Models/likes");
const TaskSolution = require("../../../DataBase/Models/taskSolutions");
const UserDetail = require("../../../DataBase/Models/userDetails");
const User = require("../../../DataBase/Models/users");
const { getCodeContent } = require("../../../GitHub/gihubApiRequest");
const timeTimeDifference = require("../../../utils/getTimeNow");
const jwt = require("jsonwebtoken");

const getTaskSingleDetailsResolver = {
  Query: {
    getTaskSingleDetails: async (_, { input }, { res, req }) => {
      try {
        const [taskId] = [input.id];
        let [
          follow,
          like,
          comments,
          likeCounter,
          followCounter,
          codeOrProject,
        ] = [true, true, [], 0, 0, {}];
        const taskLikes = await Likes.findOne({ id: taskId });
        likeCounter = taskLikes.likes.length;
        const cookieToken = req?.cookies?.token;
        const findTask = await TaskSolution.findOne({ _id: taskId });

        const followers = await Followers.findOne({ id: findTask.id });
        followCounter = followers.followers.length;
        if (!cookieToken) {
          like = false;
          follow = false;
          icon = null;
        } else {
          const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);

          like = taskLikes.likes.find((x) => x.toString() === decoded.userId)
            ? true
            : false;
          follow = followers.followers.find(
            (x) => x.toString() === decoded.userId
          )
            ? true
            : false;
        }

        const result = await TaskSolution.findOne({ _id: taskId });
        const user = await User.findOne({ _id: result.id });
        const userDetail = await UserDetail.findOne({ id: result.id });
        const findComments = await Comments.find({ taskId: taskId }).sort({
          createdAt: -1,
        });

        if (findComments) {
          const commentsData = await Promise.all(
            findComments.map(async (x) => {
              const user = await UserDetail.findOne({ id: x.createdById });
              return {
                timePast: `${timeTimeDifference(x.createdAt)} ago ${
                  x?.updatedAt ? "(edited)" : ""
                }`,
                username: x.username,
                createdById: x.createdById,
                commentId: x._id,
                text: x.text,
                icon: user.icon,
              };
            })
          );

          comments = commentsData;
        }

        result?.project
          ? (codeOrProject.project = result.project)
          : (codeOrProject.content = await getCodeContent(result.githubLink));

        return {
          video: result.videoLink,
          follow,
          followCounter,
          like,
          likeCounter,
          userDetails: { id: user._id, username: user.username },
          ...codeOrProject,
          icon: userDetail.icon,
          taskName: result.taskName,
          taskId,
          comments: comments.length !== 0 ? JSON.stringify(comments) : "",
          status: {
            code: 200,
            message: "Successful Fetch Task",
          },
        };
      } catch (e) {
        console.error("Error getTaskSingle", e);
        return {
          status: {
            code: 500,
            message: "Unsuccessful Fetch Task",
          },
        };
      }
    },
  },
};

module.exports = getTaskSingleDetailsResolver;
