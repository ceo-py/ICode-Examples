const jwt = require('jsonwebtoken');
const UserDetail = require('../../../DataBase/Models/userDetails');

const tokenResolver = {
    Query: {
        getToken: async (_, { __ }, { req, res }) => {
            const cookieToken = req?.cookies?.token;

            try {
                const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);
                const user = await UserDetail.findOne({id: decoded.userId})
                
                return {
                    code: 200,
                    username: decoded.username,
                    iconUrl: user.icon,
                    message: 'Token verified successfully'
                };
            } catch (err) {
                console.error('Token verification failed:', err.message);
                return { code: 401, message: 'Token verification failed' };
            }
        }
    }
};

module.exports = tokenResolver;
