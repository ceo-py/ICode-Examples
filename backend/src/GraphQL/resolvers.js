const createCommentResolver = require('./Resolvers/Mutation/createComment');
const createReportResolver = require('./Resolvers/Mutation/createReport');
const deleteCommentResolver = require('./Resolvers/Mutation/deleteComment');
const deleteTaskResolver = require('./Resolvers/Mutation/deleteTask');
const deleteUserResolver = require('./Resolvers/Mutation/deleteUser');
const editCommentResolver = require('./Resolvers/Mutation/editComment');
const followUserResolver = require('./Resolvers/Mutation/followUser');
const likeTaskResolver = require('./Resolvers/Mutation/likeTask');
const loginResolver = require('./Resolvers/Mutation/login');
const logOutResolver = require('./Resolvers/Mutation/logout');
const registerResolver = require('./Resolvers/Mutation/register');
const updateTaskResolver = require('./Resolvers/Mutation/updateTask');
const updateUserResolver = require('./Resolvers/Mutation/updateUserDetails');
const uploadTaskResolver = require('./Resolvers/Mutation/uploadTask');
const indexTop20Resolver = require('./Resolvers/Query/getIndexTop20');
const getTaskDetailsForUpdateResolver = require('./Resolvers/Query/getTaskDetailsForUpdate');
const getTaskGlobalResolver = require('./Resolvers/Query/getTaskGlobal');
const getTaskSingleDetailsResolver = require('./Resolvers/Query/getTaskSIngle');
const tokenResolver = require('./Resolvers/Query/getToken');
const userResolver = require('./Resolvers/Query/getUser');
const getUserHomeResolver = require('./Resolvers/Query/getUserHome');




const resolvers = [
    loginResolver, logOutResolver, registerResolver, tokenResolver,
    userResolver, updateUserResolver, deleteUserResolver, uploadTaskResolver,
    getTaskGlobalResolver, getTaskSingleDetailsResolver, createCommentResolver,
    editCommentResolver, deleteCommentResolver, indexTop20Resolver, likeTaskResolver,
    followUserResolver, createReportResolver, getUserHomeResolver, updateTaskResolver,
    getTaskDetailsForUpdateResolver, deleteTaskResolver
];

module.exports = resolvers;
