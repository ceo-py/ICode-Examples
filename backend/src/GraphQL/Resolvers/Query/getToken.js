const jwt = require('jsonwebtoken');

const tokenResolver = {
    Query: {
        getToken: async (_, { __ }, { req, res }) => {
            const cookieToken = req?.cookies?.token;

            try {
                const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);
                console.log(decoded)

                return {
                    code: 200,
                    username: decoded.username,
                    iconUrl: decoded.icon,
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
