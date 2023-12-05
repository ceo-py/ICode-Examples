const bcrypt = require('bcrypt');
const User = require('../DataBase/Models/users');
const UserDetail = require('../DataBase/Models/userDetails');



const resolvers = {
  Mutation: {
    register: async (_, { input }) => {
      const { username, password } = input;


      const existingUser = await User.findOne({ username });
      // console.log(existingUser)
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

      return {
        isAuthenticated: true,
        message: 'Registration Successful',
        code: 200
      };
    },

    login: async (_, { username, password }) => {
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

        return {
          isAuthenticated: isValidPassword,
          message: 'Login successful',
          token: '123',
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
  },
};

module.exports = resolvers;
