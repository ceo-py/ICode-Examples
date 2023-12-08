const UserDetail = require('../DataBase/Models/userDetails');
const jwt = require('jsonwebtoken');

const updateUserResolver = {
  Mutation: {
    updateUser: async (_, { input }, { req }) => {
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
        const { userId: id } = jwt.verify(cookieToken, process.env.SECRET_KEY);

        const updatedUserDetail = await UserDetail.findOneAndUpdate({ id }, { $set: input }, { new: true });

        if (!updatedUser || !updatedUserDetail) {
          return {
            status: {
              message: 'Error updating user details',
              code: 400,
            },
          };
        }

        return {
          status: {
            message: 'User details updated successfully',
            code: 200,
          },
        //   updatedUser: { ...updatedUser.toObject(), id, username: updatedUser.username },
        //   updatedUserDetail: { ...updatedUserDetail.toObject(), id },
        };
      } catch (error) {
        console.error('Error updating user details:', error);
        return {
          status: {
            message: 'Error updating user details',
            code: 500,
          },
        };
      }
    },
  },
};

module.exports = updateUserResolver;
