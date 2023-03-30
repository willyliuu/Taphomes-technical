const { decodeToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const authentication = async (request, response, next) => {
    try {
        const { access_token } = request.headers;
        if (!access_token) {
            throw { status: 401, message: "Invalid token" };
        }

        const payload = decodeToken(access_token);
        const user = await User.findOne({
            where: {
                email: payload.email,
            },
        });

        if (!user) {
            throw { status: 401, message: "Invalid token" };
        }

        request.user = user;
        next();
    } catch (err) {
        if (err.status) {
            response.status(err.status).json({
                message: err.message,
            });
        } else {
            response.status(500).json({
                message: "Internal server error",
            });
        }
    }
};

const authorization = async (request, response, next) => {
    try {
        const { id } = request.params;
        const user = await User.findOne({
            where: {
                id,
            },
        });
        if (!user) {
            throw { status: 404, message: "User not found" };
        }
        if (request.user.role !== "admin") {
            throw { status: 403, message: "Forbidden" };
        }
        next();
    } catch (err) {
        if (err.status) {
            response.status(err.status).json({
                message: err.message,
            });
        } else {
            response.status(500).json({
                message: "Internal server error",
            });
        }
    }
};

module.exports = { authentication, authorization };
