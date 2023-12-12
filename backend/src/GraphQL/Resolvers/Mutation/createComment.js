const jwt = require('jsonwebtoken');
const Comments = require('../../../DataBase/Models/comments');

const createCommentResolver = {
    Mutation: {
        createComment: async (_, { input }, { req, res }) => {
            const cookieToken = req?.cookies?.token;
            if (!input.id || !input.text) {
                return {
                    code: 401,
                    message: 'Missing comment details'
                }
            }
            try {
                const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);

                const comment = new Comments({
                    taskId: input.id,
                    createdById: decoded.id,
                    username: decoded.username,
                    text: input.text,
                    createdAt: { type: Date, default: Date.now },
                    updatedAt: { type: Date, default: Date.now },
                })
                comment.save()

                return {
                    code: 200,
                    message: 'Create comment successfully'
                };

            } catch (e) {
                return {
                    code: 401,
                    message: 'Create comment unsuccessfully'
                }
            }
        }
    }
};

module.exports = createCommentResolver;
