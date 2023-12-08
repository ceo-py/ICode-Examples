const bcrypt = require('bcrypt');
const User = require('../DataBase/Models/users');
const UserDetail = require('../DataBase/Models/userDetails');
const jwt = require('jsonwebtoken');
const LoginToken = require('../DataBase/Models/loginToken');
const loginResolver = require('./Resolvers/Mutation/login');
const logOutResolver = require('./Resolvers/Mutation/logout');
const registerResolver = require('./Resolvers/Mutation/register');




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


    findToken: async (_, { __ }, { req, res }) => {
      const cookieToken = req?.cookies?.token;

      try {
        const decoded = await new Promise((resolve, reject) => {
          jwt.verify(cookieToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
              console.error('Token verification failed:', err.message);
              reject(err);
              return { code: 401, message: 'Token verification failed' };
            } else {
              console.log('Token verified successfully UserID:', decoded.userId);
              resolve(decoded);
            }
          });
        });

        return {
          code: 200,
          username:decoded.username,
          iconUrl: decoded.icon,
          message: 'Token verified successfully'
        };
      } catch (err) {
        return { code: 401, message: 'Token verification failed' };
      }
    },
  },
};

const resolvers = [resolversC, loginResolver, logOutResolver, registerResolver];

module.exports = resolvers;
