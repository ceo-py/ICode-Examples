const bcrypt = require('bcrypt');
const User = require('../DataBase/Models/users');


const resolvers = {
  Mutation: {
    register: async (_, { input }) => {
      const { username, password } = input;

      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      console.log(existingUser)
      if (existingUser) {
        throw new Error('Username already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new User({ username, password: hashedPassword });
      console.log(`Create User: ${user}`)

      // Save the user to the database
      await user.save();

      // Return the registered user
      return user;
    },
    login: async (_, { username, password }) => {
      // Implementation for login
    },
  },
};

module.exports = resolvers;
