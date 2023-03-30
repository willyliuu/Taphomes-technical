const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "secret";

module.exports = {
    encodeToken: (payload) => {
        return jwt.sign(payload, JWT_SECRET_KEY);
    },

    decodeToken: (access_token) => {
        return jwt.verify(access_token, JWT_SECRET_KEY);
    },
};
