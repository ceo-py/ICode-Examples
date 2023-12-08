const jwt = require('jsonwebtoken');
const UserDetail = require('../../../DataBase/Models/userDetails');

const updateUserResolver = {
    Mutation: {
        updateUser: async (_, { input }, { req, res }) => {
            const cookieToken = req?.cookies?.token;

            if (!cookieToken) {
                return {
                    message: 'JWT must be provided',
                    code: 400,
                };
            }
            try {
                const { userId: id } = jwt.verify(cookieToken, process.env.SECRET_KEY);

                const updatedUserDetail = await UserDetail.findOneAndUpdate({ id }, { $set: input }, { new: true });

                if (!updatedUserDetail) {
                    return {
                        message: 'Error updating user details',
                        code: 400,
                    };
                }
                return {
                    message: 'User details updated successfully',
                    code: 200,
                };
            } catch (error) {
                console.error('Error updating user details:', error);
                return {
                    message: 'Error updating user details',
                    code: 500,
                };
            }
        },
    },
};

module.exports = updateUserResolver;
