const jwt = require('jsonwebtoken');
const UserDetail = require('../../../DataBase/Models/userDetails');
const User = require('../../../DataBase/Models/users');

const userResolver = {
    Query: {
        getUser: async (_, __, { req }) => {
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

                const [userDetail, user] = await Promise.all([
                    UserDetail.findOne({ id }),
                    User.findOne({ _id: id }),
                ]);

                if (!userDetail || !user) {
                    return {
                        status: {
                            message: 'Error fetching user details',
                            code: 400,
                        },
                    };
                }

                return {
                    status: {
                        message: 'User details fetched successfully',
                        code: 200,
                    },
                    userDetails: { ...userDetail.toObject(), id, username: user.username },
                };
            } catch (error) {
                console.error('Error fetching user details:', error);
                return {
                    status: {
                        message: 'Error fetching user details',
                        code: 500,
                    },
                };
            }
        },
    },
};

module.exports = userResolver;
