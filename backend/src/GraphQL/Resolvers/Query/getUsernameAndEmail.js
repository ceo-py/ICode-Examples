const PasswordResetToken = require('../../../DataBase/Models/loginToken');
const UserDetail = require('../../../DataBase/Models/userDetails');
const User = require('../../../DataBase/Models/users');
const sendEmail = require('../../../Email/emailServer');
const jwt = require('jsonwebtoken');

const getUsernameAndEmailResolver = {
    Query: {
        getUsernameAndEmail: async (_, { input }, { req }) => {
            const { username, email } = input

            try {
                const user = await User.findOne({ username })
                if (!user) {
                    return {
                        message: `The username you entered doesn't belong to an account. Please check your username and try again.`,
                        code: 400,
                    }
                }
                const userDetails = await UserDetail.findOne({ id: user._id.toString() })
                if (!userDetails.email) {
                    return {
                        message: `Password reset failed due to the absence of an associated email address. During account creation, no email was provided, and we cannot proceed without it.`,
                        code: 400,
                    }
                }
                if (userDetails.email !== email) {
                    return {
                        message: `We couldn't verify your identity because the provided email address doesn't match the username associated with your account. Please double-check the information you entered and try again.`,
                        code: 400,
                    }
                }

                const token = jwt.sign(
                    { username, email },
                    process.env.SECRET_KEY,
                    { expiresIn: '24h' }
                );
                
                const resetToken = new PasswordResetToken({ token });
                await resetToken.save();

                return await sendEmail(username, email)

            } catch (error) {
                console.error('Error getUsernameAndEmail:', error);
                return {
                    message: 'Error fetching user details',
                    code: 500,
                };
            }
        },
    },
};

module.exports = getUsernameAndEmailResolver;
