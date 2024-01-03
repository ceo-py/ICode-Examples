const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../../DataBase/Models/users');
const UserDetail = require('../../../DataBase/Models/userDetails');
const Followers = require('../../../DataBase/Models/followers');

const registerResolver = {
  Mutation: {
    register: async (_, { input }, { req, res }) => {
      try {
        const { username, password } = input;

        const existingUser = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });


        if (existingUser) {
          return {
            message: 'That username is taken. Try another.',
            code: 409
          };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, password: hashedPassword });
        await user.save();

        const userDetail = new UserDetail({ id: user._id });
        await userDetail.save();

        const followers = new Followers({ id: user._id });
        await followers.save();

        const token = jwt.sign(
          { userId: user._id, username, icon: userDetail.icon },
          process.env.SECRET_KEY,
          { expiresIn: '30d' }
        );

        res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true });

        return {
          message: 'Registration successful',
          iconUrl: userDetail.icon,
          code: 200
        };
      } catch (error) {
        console.error('Error during registration:', error.message);
        return {
          message: 'Internal server error',
          code: 500
        };
      }
    }
  }
};

module.exports = registerResolver;
