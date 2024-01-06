const jwt = require('jsonwebtoken');
const TaskSolution = require('../../../DataBase/Models/taskSolutions');
const Likes = require('../../../DataBase/Models/likes');

const uploadTaskResolver = {
    Mutation: {
        uploadTask: async (_, { input }, { req, res }) => {
            const cookieToken = req?.cookies?.token;

            if (!cookieToken) {
                return {
                    message: 'JWT must be provided',
                    code: 400,
                };
            }
            try {
                const { userId: id } = jwt.verify(cookieToken, process.env.SECRET_KEY);
                const task = new TaskSolution({ id, ...input });
                await task.save();
                const like = new Likes({ id: task._id });
                await like.save();

                if (!task) {
                    return {
                        message: 'Error creating task',
                        code: 400,
                    };
                }
                return {
                    message: 'Task was created successfully',
                    code: 200,
                };
            } catch (error) {
                console.error('Upload task', error)
                if (error.code === 11000) {
                    return {
                        message: 'Error invalid creating task duplicate GitHub URL',
                        code: 400 ,
                    };
                }
                return {
                    message: 'Error creating task',
                    code: 500,
                };
            }
        },
    },
};

module.exports = uploadTaskResolver;
