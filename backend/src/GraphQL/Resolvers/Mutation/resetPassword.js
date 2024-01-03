const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../../DataBase/Models/users');
const PasswordResetToken = require('../../../DataBase/Models/loginToken');

const ResetPasswordResolver = {
    Mutation: {
        resetPassword: async (_, { input }, { req, res }) => {

            try {

                const foundToken = await PasswordResetToken.findOne({ token: input.token });

                if (!foundToken) {
                    return {
                        message: 'Error incorrect token',
                        code: 400,
                    };
                }
                const { username } = jwt.verify(foundToken.token, process.env.SECRET_KEY);

                const password = await bcrypt.hash(input.password, 10);
                const user = await User.findOneAndUpdate({ username }, { $set: { password } }, { new: true });

                if (!user) {
                    return {
                        message: 'Error user not found',
                        code: 400,
                    };
                }

                await PasswordResetToken.deleteOne({ _id: foundToken._id });
                return {
                    message: 'User password updated successfully',
                    code: 200,
                };

            } catch (error) {
                console.error('Error changing password:', error);
                return {
                    message: 'Error changing password',
                    code: 500,
                };
            }
        },
    },
};

module.exports = ResetPasswordResolver;
