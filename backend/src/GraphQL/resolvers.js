const User = require('../DataBase/Models/users');
const UserDetail = require('../DataBase/Models/userDetails');
const jwt = require('jsonwebtoken');
const loginResolver = require('./Resolvers/Mutation/login');
const logOutResolver = require('./Resolvers/Mutation/logout');
const registerResolver = require('./Resolvers/Mutation/register');
const tokenResolver = require('./Resolvers/Query/getToken');




const resolversC = {
  Query: {
    getUser: async (_, __, { req }) => {
      const cookieToken = req?.cookies?.token;

      if (!cookieToken) {
        return {
          status: {
            message: 'JWT must be provided',
            code: 400,
          },
        };
      }

      try {
        const decodedToken = jwt.verify(cookieToken, process.env.SECRET_KEY);
        const id = decodedToken.userId;

        const [userDetail, user] = await Promise.all([
          UserDetail.findOne({ id }),
          User.findOne({ _id: id }),
        ]);

        if (!userDetail || !user) {
          return {
            status: {
              message: 'Error fetching user details',
              code: 400,
            },
          };
        }

        return {
          status: {
            message: 'User details fetched successfully',
            code: 200,
          },
          userDetails: { ...userDetail.toObject(), id, username: user.username },
        };
      } catch (error) {
        console.error('Error fetching user details:', error);
        return {
          status: {
            message: 'Error fetching user details',
            code: 500,
          },
        };
      }
    },
  },
};

const resolvers = [resolversC, loginResolver, logOutResolver, registerResolver, tokenResolver];

module.exports = resolvers;
