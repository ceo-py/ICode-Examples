
const logOutResolver = {
    Mutation: {
        logout: async (_, { __ }, { req, res }) => {
            res.clearCookie('token');
            return { message: 'Logout successful', code: 200 }
        },
    },
};


module.exports = logOutResolver;
