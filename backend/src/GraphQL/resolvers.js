const bcrypt = require('bcrypt');
const User = require('../DataBase/Models/users');


const resolvers = {
  Mutation: {
    register: async (_, { input }) => {
      const { username, password } = input;

      const existingUser = await User.findOne({ username });
      console.log(existingUser)
      if (existingUser) {
        throw new Error('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ username, password: hashedPassword });
      console.log(`Create User: ${user}`)

      await user.save();

      return user;
    },
    login: async (_, { username, password }) => {
      console.log(`User : ${username}, pass: ${password}`)
      const existingUser = await User.findOne({ username });
      console.log(existingUser)
      if (!existingUser) {
        throw new Error('Invalid Username');
      }
      console.log(`User pass from db ${existingUser.password}`)
      bcrypt.compare(password, existingUser.password, (err, result) => {
        if (err) {
          console.error('Error comparing passwords:', err);

        } else if (result) {
          console.log('Password is correct');
          
        } else {
          console.log('Password is incorrect');
        }
      });
      return existingUser
    },
  },
};

module.exports = resolvers;
