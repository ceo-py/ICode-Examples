const jwt = require('jsonwebtoken');
const Comments = require('../../../DataBase/Models/comments');
const timeTimeDifference = require('../../../utils/getTimeNow');

const deleteCommentResolver = {
    Mutation: {
        deleteComment: async (_, { input }, { req, res }) => {
            const cookieToken = req?.cookies?.token;
            if (!input.id) {
                return {
                    status: {
                        code: 401,
                        message: 'Missing comment details'
                    }
                }
            }
            try {
                const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);
                await Comments.deleteOne({ _id: id });

                return {
                    code: 200,
                    message: 'Delete comment successfully'
                };

            } catch (e) {
                return {
                    code: 401,
                    message: 'Delete comment unsuccessfully'

                }
            }
        }
    }
};

module.exports = deleteCommentResolver;
