const { getCodeContent } = require("../../../GitHub/gihubApiRequest");




const getTaskProjectFileResolver = {
    Query: {
        getTaskProjectFile: async (_, { input }) => {
            try {
                const taskUrl = input.url
                const content = await getCodeContent(taskUrl)

                return {
                    content,
                    status: {
                        code: 200,
                        message: "Successful Fetch Task"
                    }
                }
            } catch (e) {
                console.error('Error getTaskProjectFile', e)
                return {
                    status: {
                        code: 500,
                        message: "Unsuccessful Fetch Task"
                    }
                }
            }
        },
    },
};

module.exports = getTaskProjectFileResolver;
