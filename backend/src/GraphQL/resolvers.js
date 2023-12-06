const bcrypt = require('bcrypt');
const User = require('../DataBase/Models/users');
const UserDetail = require('../DataBase/Models/userDetails');
const jwt = require('jsonwebtoken');
const LoginToken = require('../DataBase/Models/loginToken');



const resolvers = {
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

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '30d' });
      res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true });

      return {
        isAuthenticated: true,
        message: 'Registration Successful',
        code: 200,
      };
    },

    login: async (_, { username, password }, { req, res }) => {
      // console.log(`User : ${username}, pass: ${password}`)
      const existingUser = await User.findOne({ username });
      if (!existingUser) {

        return {
          isAuthenticated: false,
          message: 'Login unsuccessful. Invalid credentials.',
          code: 401
        };
      }

      // console.log(`User pass from db ${existingUser.password}`)

      try {
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        // console.log(`Password is : ${isValidPassword}`)

        if (!isValidPassword) {

          return {
            isAuthenticated: isValidPassword,
            message: 'Login unsuccessful. Invalid credentials.',
            code: 401
          }
        };

        const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET_KEY, { expiresIn: '30d' });
        res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true });
        // const loginToken = new LoginToken({ token });
        // await loginToken.save();

        return {
          isAuthenticated: isValidPassword,
          message: 'Login successful',
          code: 200
        };

      } catch (error) {
        console.error(error)
        return {
          isAuthenticated: false,
          message: 'Error during password comparison',
          code: 500
        }
      }
    },
    logout: async (_, { __ }, { req, res }) => {
      res.clearCookie('token');
      return { message: 'Logout successful', code: 200 }
    },
  },
  Query: {
    getUser: async (_, { userId }) => {
      try {
        const userDetail = await UserDetail.findOne({ id: userId });
        // console.log(userDetail)
        if (!userDetail) {
          return {
            status: {
              message: 'Error fetching user details',
              code: 400
            }
          }
        }

        return {
          status: {
            message: 'User details fetched successfully',
            code: 200
          },
          userDetails: userDetail
        }

      } catch (error) {
        console.error('Error fetching user details:', error);
        return {
          status: {
            message: 'Error fetching user details',
            code: 500
          }
        }
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
            } else {
              console.log('Token verified successfully UserID:', decoded.userId);
              resolve(decoded);
            }
          });
        });

        return { token: cookieToken };
      } catch (err) {
        return { code: 401, message: 'Token verification failed' };
      }
    },
  },
};

module.exports = resolvers;
