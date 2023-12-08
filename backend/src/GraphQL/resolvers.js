const bcrypt = require('bcrypt');
const User = require('../DataBase/Models/users');
const UserDetail = require('../DataBase/Models/userDetails');
const jwt = require('jsonwebtoken');
const LoginToken = require('../DataBase/Models/loginToken');
const loginResolver = require('./Resolvers/Mutation/login');




const resolversC = {
  Mutation: {
    register: async (_, { input }, { req, res }) => {
      const { username, password } = input;


      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return {
          isAuthenticated: false,
          message: 'User Already exist',
          code: 409
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ username, password: hashedPassword });
      // console.log(`Create User: ${user}`)


      await user.save();

      const userDetail = UserDetail({ id: user._id })
      userDetail.save()

      const token = jwt.sign({ userId: user._id, username, icon: userDetail.icon }, process.env.SECRET_KEY, { expiresIn: '30d' });
      res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true });

      return {
        isAuthenticated: true,
        message: 'Registration Successful',
        code: 200,
      };
    },
    logout: async (_, { __ }, { req, res }) => {
      res.clearCookie('token');
      return { message: 'Logout successful', code: 200 }
    },
  },
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

const resolvers = [resolversC, loginResolver];

module.exports = resolvers;
