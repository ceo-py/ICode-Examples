const jwt = require('jsonwebtoken');
const Comments = require('../../../DataBase/Models/comments');
const timeTimeDifference = require('../../../utils/getTimeNow');

const createCommentResolver = {
    Mutation: {
        createComment: async (_, { input }, { req, res }) => {
            const cookieToken = req?.cookies?.token;
            if (!input.id || !input.text) {
                return {
                    status: {
                        code: 401,
                        message: 'Missing comment details'
                    }
                }
            }
            try {
                const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);

                const comment = new Comments({
                    taskId: input.id,
                    createdById: decoded.userId,
                    username: decoded.username,
                    text: input.text.trim(),
                })
                await comment.save()

                return {
                    status: {
                        code: 200,
                        message: 'Create comment successfully'
                    },

                    commentDetails: JSON.stringify({
                        timePast: `1 second ago`,
                        username: decoded.username,
                        createdById: decoded.userId,
                        commentId: comment._id,
                        text: comment.text,
                        icon: decoded.icon
                    }),
                };

            } catch (e) {
                return {
                    status: {
                        code: 401,
                        message: 'Create comment unsuccessfully'
                    }
                }
            }
        }
    }
};

module.exports = createCommentResolver;
