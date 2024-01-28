const jwt = require('jsonwebtoken');
const TaskSolution = require('../../../DataBase/Models/taskSolutions');
const Likes = require('../../../DataBase/Models/likes');
const { generateMultiFileDirectoryProject } = require('../../../GitHub/gihubApiRequest');

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
                const project = input.project
                delete input.project
                if (project) {
                    const projectTreeGen = await generateMultiFileDirectoryProject(input.githubLink)
                    if (!(projectTreeGen instanceof Error)) {
                        input.project = projectTreeGen;
                    } else {
                        return {
                            message: 'Project upload failed. Provide main directory path.',
                            code: 400,
                        };
                    }
                }
                input.taskName = input.taskName.length > 50 ? input.taskName.slice(0, 50) + "..." : input.taskName
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
                        code: 400,
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
