const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../../DataBase/Models/users');
const UserDetail = require('../../../DataBase/Models/userDetails');

const ResetPasswordResolver = {
    Mutation: {
        resetPassword: async (_, { input }, { req, res }) => {

            try {

                const { username } = await PasswordReset.findOne({ token: input.token });

                const password = await bcrypt.hash(input.password, 10);

                const user = await User.findOneAndUpdate({ username }, { $set: password }, { new: true });

                const userDetail = await UserDetail.find({ id: user._id.toString() });

                if (!user || userDetail) {
                    return {
                        message: 'Error changing password',
                        code: 400,
                    };
                }

                const token = jwt.sign(
                    { userId: user._id, username, icon: userDetail.icon },
                    process.env.SECRET_KEY,
                    { expiresIn: '30d' }
                );

                res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true });

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
