const UserDetail = require('../../../DataBase/Models/userDetails');
const User = require('../../../DataBase/Models/users');

const getUsernameAndEmailResolver = {
    Query: {
        getUsernameAndEmail: async (_, { input }, { req }) => {
            const username = input.username
            const email = input.email
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
                const maskedEmail = `${email.substring(0, 3)}${'*'.repeat(email.indexOf('@') - 3)}@${email.substring(email.indexOf('@') + 1)}`;
                return {
                    message: `We've successfully received your password reset request. You'll receive an email at ${maskedEmail} with instructions on how to reset your password. Please check your inbox for further details.`,
                    code: 200,
                }

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
