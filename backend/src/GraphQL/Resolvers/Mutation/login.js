const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../../DataBase/Models/users');
const UserDetail = require('../../../DataBase/Models/userDetails');



const loginResolver = {
  Mutation: {
    login: async (_, { username, password }, { req, res }) => {
      try {
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
          return {
            message: 'Login unsuccessful. Invalid credentials.',
            code: 401
          };
        }

        const isValidPassword = await bcrypt.compare(password, existingUser.password);

        if (!isValidPassword) {
          return {
            message: 'Login unsuccessful. Invalid credentials.',
            code: 401
          };
        }

        const userDetail = await UserDetail.findOne({ id: existingUser._id });

        if (!userDetail) {
          return {
            message: 'Error fetching user details.',
            code: 500
          };
        }

        const token = jwt.sign(
          { userId: existingUser._id, username, icon: userDetail.icon },
          process.env.SECRET_KEY,
          { expiresIn: '30d' }
        );

        res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true });

        return {
          message: 'Login successful',
          iconUrl: userDetail.icon,
          username,
          code: 200
        };
      } catch (error) {
        console.error('Error during login:', error.message);
        return {
          message: 'Internal server error',
          code: 500
        };
      }
    },
  },
};

module.exports = loginResolver;
