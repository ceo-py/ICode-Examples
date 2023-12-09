const deleteUserResolver = require('./Resolvers/Mutation/deleteUser');
const loginResolver = require('./Resolvers/Mutation/login');
const logOutResolver = require('./Resolvers/Mutation/logout');
const registerResolver = require('./Resolvers/Mutation/register');
const updateUserResolver = require('./Resolvers/Mutation/updateUserDetails');
const uploadTaskResolver = require('./Resolvers/Mutation/uploadTask');
const getTaskGlobalResolver = require('./Resolvers/Query/getTaskGlobal');
const tokenResolver = require('./Resolvers/Query/getToken');
const userResolver = require('./Resolvers/Query/getUser');



const resolvers = [
    loginResolver, logOutResolver, registerResolver, tokenResolver,
    userResolver, updateUserResolver, deleteUserResolver, uploadTaskResolver,
    getTaskGlobalResolver
];

module.exports = resolvers;
