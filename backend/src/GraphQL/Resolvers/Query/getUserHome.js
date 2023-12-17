const jwt = require('jsonwebtoken');


const getUserHomeResolver = {
    Query: {
        getUserHome: async (_, __, { req }) => {
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

                const [userDetail, user, followers] = await Promise.all([
                    UserDetail.findOne({ id }),
                    User.findOne({ _id: id }),
                    Followers.findOne({ id }),
                ]);

                if (!userDetail || !user || !followers) {
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
                    userDetails: { ...userDetail.toObject(), username: user.username, followers: followers.followers.length },
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

module.exports = getUserHomeResolver;
