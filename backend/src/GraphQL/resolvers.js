const bcrypt = require('bcrypt');
const User = require('../DataBase/Models/users');


const resolvers = {
  Mutation: {
    register: async (_, { username, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      return user;
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      return user;
    },
  },
};

module.exports = resolvers;
