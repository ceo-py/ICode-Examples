const jwt = require('jsonwebtoken');
const Comments = require('../../../DataBase/Models/comments');

const editCommentResolver = {
    Mutation: {
        editComment: async (_, { input }, { req, res }) => {
            const cookieToken = req?.cookies?.token;
            if (!input.id || !input.text) {
                return {
                    code: 401,
                    message: 'Missing comment details'
                }
            }
            try {
                jwt.verify(cookieToken, process.env.SECRET_KEY);
                const updatedUserDetail = await Comments.findOneAndUpdate(
                    { _id: input.id },
                    { $set: { text: input.text } },
                    { new: true }
                );

                if (!updatedUserDetail) {
                    return {
                        message: 'Error edit comment',
                        code: 400,
                    };
                }

                return {
                    code: 200,
                    message: 'Edit comment successfully'
                };

            } catch (e) {
                return {
                    code: 401,
                    message: 'Edit comment unsuccessfully'
                }
            }
        }
    }
};

module.exports = editCommentResolver;
