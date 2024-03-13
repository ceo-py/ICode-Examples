const jwt = require('jsonwebtoken');
const Comments = require('../../../DataBase/Models/comments');
const UserDetail = require('../../../DataBase/Models/userDetails');
const { userConnections } = require('../../../websocketServer');
const filterUnique = require('../../../utils/filterUnique');
const Notification = require('../../../DataBase/Models/notifications');


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
                const user = await UserDetail.findOne({ id: decoded.userId })
                const comment = new Comments({
                    taskId: input.id,
                    createdById: decoded.userId,
                    username: decoded.username,
                    text: input.text.trim(),
                })
                await comment.save()
                
                const notification = new Notification({
                    commentId: comment._id,
                    userId: user.id.toString(),
                })

                await notification.save()

                const uniqueComments = filterUnique(await Comments.find({ taskId: input.id }).sort({ createdAt: 1 }))


                uniqueComments.forEach(c => {
                    const user = userConnections.get(c.createdById.toString())
                    user?.send(JSON.stringify('Comment created'));
                })


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
                        icon: user.icon
                    }),
                };

            } catch (e) {
                console.log('Create comment error:\n', e)
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
