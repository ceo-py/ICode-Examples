const jwt = require('jsonwebtoken');
const UserDetail = require('../../../DataBase/Models/userDetails');
const User = require('../../../DataBase/Models/users');
const Followers = require('../../../DataBase/Models/followers');
const TaskSolution = require('../../../DataBase/Models/taskSolutions');


const getUserHomeResolver = {
    Query: {
        getUserHome: async (_, { input }, { req }) => {

            const filterByLanguage = (taskSolutions, language) => {
                return JSON.stringify(taskSolutions.filter(x => x.language === language))
            }

            try {
                const user = await User.findOne({ username: input.username })

                if (!user) {
                    return {
                        languages: {
                            python: '0',
                            java: '0',
                            csharp: '0',
                            javascript: '0',
                            status: {
                                message: 'User not found',
                                code: 401,
                            }
                        },
                    };
                }


                const [userDetail, followers, taskSolutions] = await Promise.all([
                    UserDetail.findOne({ id: user._id.toString() }),
                    Followers.findOne({ id: user._id.toString() }),
                    TaskSolution.find({ id: user._id.toString() }),
                ]);

                if (!userDetail || !user || !followers || !taskSolutions) {
                    return {
                        languages: {
                            status: {
                                message: 'Error fetching user details',
                                code: 400,
                            }
                        },
                    };
                }
                const cookieToken = req?.cookies?.token;
                let [follower, userId] = [false, '']
                if (cookieToken) {
                    const { userId: id } = jwt.verify(cookieToken, process.env.SECRET_KEY);
                    userId = followers.id
                    follower = followers.followers.includes(id)
                }
                return {
                    userId,
                    follower,
                    totalSolutions: taskSolutions.length,
                    languages: {
                        python: filterByLanguage(taskSolutions, 'Python'),
                        java: filterByLanguage(taskSolutions, 'Java'),
                        csharp: filterByLanguage(taskSolutions, 'C#'),
                        javascript: filterByLanguage(taskSolutions, 'JavaScript'),
                        status: {
                            message: 'User details fetched successfully',
                            code: 200,
                        }
                    },
                    details: { ...userDetail.toObject(), username: user.username, followers: followers.followers.length },
                };
            } catch (error) {
                console.error('Error fetching user details:', error);
                return {
                    languages: {
                        python: '0',
                        java: '0',
                        csharp: '0',
                        javascript: '0',
                        status: {
                            message: 'Error fetching user details',
                            code: 500,
                        }
                    },
                };
            }
        },
    },
};

module.exports = getUserHomeResolver;
