const createCommentResolver = require("./Resolvers/Mutation/createComment");
const createReportResolver = require("./Resolvers/Mutation/createReport");
const deleteCommentResolver = require("./Resolvers/Mutation/deleteComment");
const deleteTaskResolver = require("./Resolvers/Mutation/deleteTask");
const deleteUserResolver = require("./Resolvers/Mutation/deleteUser");
const editCommentResolver = require("./Resolvers/Mutation/editComment");
const followUserResolver = require("./Resolvers/Mutation/followUser");
const likeTaskResolver = require("./Resolvers/Mutation/likeTask");
const loginResolver = require("./Resolvers/Mutation/login");
const logOutResolver = require("./Resolvers/Mutation/logout");
const registerResolver = require("./Resolvers/Mutation/register");
const ResetPasswordResolver = require("./Resolvers/Mutation/resetPassword");
const updateTaskResolver = require("./Resolvers/Mutation/updateTask");
const updateUserResolver = require("./Resolvers/Mutation/updateUserDetails");
const uploadTaskResolver = require("./Resolvers/Mutation/uploadTask");
const getCommentNotificationResolver = require("./Resolvers/Query/getCommentNotifications");
const indexTop20Resolver = require("./Resolvers/Query/getIndexTop20");
const getModuleExamplesResolver = require("./Resolvers/Query/getModuleExamples");
const getReportResolver = require("./Resolvers/Query/getReport");
const getTaskDetailsForUpdateResolver = require("./Resolvers/Query/getTaskDetailsForUpdate");
const getTaskGlobalResolver = require("./Resolvers/Query/getTaskGlobal");
const getTaskProjectFileResolver = require("./Resolvers/Query/getTaskProjectFIle");
const getTaskSingleDetailsResolver = require("./Resolvers/Query/getTaskSIngle");
const tokenResolver = require("./Resolvers/Query/getToken");
const userResolver = require("./Resolvers/Query/getUser");
const getUserHomeResolver = require("./Resolvers/Query/getUserHome");
const getUsernameAndEmailResolver = require("./Resolvers/Query/getUsernameAndEmail");
const getFollowNotificationResolver = require("./Resolvers/Query/getFollowNotification");
const getLikeNotificationResolver = require("./Resolvers/Query/getLikeNotification");

const resolvers = [
  loginResolver,
  logOutResolver,
  registerResolver,
  tokenResolver,
  userResolver,
  updateUserResolver,
  deleteUserResolver,
  uploadTaskResolver,
  getTaskGlobalResolver,
  getTaskSingleDetailsResolver,
  createCommentResolver,
  editCommentResolver,
  deleteCommentResolver,
  indexTop20Resolver,
  likeTaskResolver,
  followUserResolver,
  createReportResolver,
  getUserHomeResolver,
  updateTaskResolver,
  getTaskDetailsForUpdateResolver,
  deleteTaskResolver,
  getUsernameAndEmailResolver,
  ResetPasswordResolver,
  getModuleExamplesResolver,
  getTaskProjectFileResolver,
  getReportResolver,
  getCommentNotificationResolver,
  getFollowNotificationResolver,
  getLikeNotificationResolver,
];

module.exports = resolvers;
