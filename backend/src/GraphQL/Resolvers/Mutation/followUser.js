const jwt = require('jsonwebtoken');
const Followers = require('../../../DataBase/Models/followers');

const followUserResolver = {
    Mutation: {
        followUser: async (_, { input }, { req, res }) => {
            const cookieToken = req?.cookies?.token;
            const followId = input.id

            if (!followId) {
                return {
                    code: 401,
                    message: 'Missing follow details'
                }
            }
            try {
                const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);
                const userId = decoded.userId

                const followers = await Followers.findOne({ id: followId })
                const updateQuery = { id: followId };
                const userIndex = followers.followers.indexOf(userId);

                userIndex === -1 ? updateQuery.$addToSet = { followers: userId } : updateQuery.$pull = { followers: userId };
                await Followers.updateOne({ id: followId }, updateQuery);

                return {

                    code: 200,
                    message: 'Follow request successful'

                };

            } catch (e) {
                console.log('Follow request error:\n', e)
                return {
                    code: 500,
                    message: 'Follow request unsuccessful'
                }
            }
        }
    }
};

module.exports = followUserResolver;
