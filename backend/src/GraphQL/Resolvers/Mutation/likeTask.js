const jwt = require('jsonwebtoken');
const Likes = require('../../../DataBase/Models/likes');

const likeTaskResolver = {
    Mutation: {
        likeTask: async (_, { input }, { req, res }) => {
            const cookieToken = req?.cookies?.token;
            const taskId = input.id

            if (!taskId) {
                return {
                    code: 401,
                    message: 'Missing like details'
                }
            }
            try {
                const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);
                const userId = decoded.userId
                const taskLikes = await Likes.findOne({ id: taskId })
                const updateQuery = { id: taskId };
                const userIndex = taskLikes.likes.indexOf(userId);

                userIndex === -1 ? updateQuery.$addToSet = { likes: userId } : updateQuery.$pull = { likes: userId };
                await Likes.updateOne({ id: taskId }, updateQuery);

                return {

                    code: 200,
                    message: 'Like request successful'

                };

            } catch (e) {
                console.error('Like tasks error:\n', e)
                return {
                    code: 500,
                    message: 'Like request unsuccessful'
                }
            }
        }
    }
};

module.exports = likeTaskResolver;
