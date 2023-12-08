const loginResolver = require('./Resolvers/Mutation/login');
const logOutResolver = require('./Resolvers/Mutation/logout');
const registerResolver = require('./Resolvers/Mutation/register');
const tokenResolver = require('./Resolvers/Query/getToken');
const userResolver = require('./Resolvers/Query/getUser');



const resolvers = [loginResolver, logOutResolver, registerResolver, tokenResolver, userResolver];

module.exports = resolvers;
