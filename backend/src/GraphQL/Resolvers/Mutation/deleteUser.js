const Comments = require("../../../DataBase/Models/comments");
const Followers = require("../../../DataBase/Models/followers");
const Likes = require("../../../DataBase/Models/likes");
const TaskSolution = require("../../../DataBase/Models/taskSolutions");
const UserDetail = require("../../../DataBase/Models/userDetails");
const User = require("../../../DataBase/Models/users");
const jwt = require('jsonwebtoken');


const deleteUserResolver = {
    Mutation: {
        deleteUser: async (_, { __ }, { req, res }) => {
            const cookieToken = req?.cookies?.token;

            if (!cookieToken) {
                return {
                    message: 'JWT must be provided',
                    code: 401,
                };
            }
            try {
                const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);
                const id = decoded.userId
                await UserDetail.deleteOne({ id });
                await User.deleteOne({ _id: id });
                await Followers.deleteOne({ id });
                await TaskSolution.deleteMany({ id })
                await Comments.deleteMany({ createdById: id })

                await Followers.updateMany(
                    { followers: id },
                    { $pull: { followers: id } }
                );
                await Likes.updateMany(
                    { likes: id },
                    { $pull: { likes: id } }
                );

                return {
                    message: 'User Successfully Deleted',
                    code: 200,
                };
            } catch (error) {
                console.error('Error deleting user', error);
                return {
                    message: 'Error deleting user',
                    code: 500,
                };
            }
        },
    },
};


module.exports = deleteUserResolver;
