const { User } = require("../models/index.js");
const { hash, checkPassword } = require("../helpers/bcrypt");
const { encodeToken } = require("../helpers/jwt.js");

class Controller {
    static async loginUser(request, response) {
        try {
            const { email, password } = request.body;
            if (!email) {
                throw { status: 400, message: "Email is required" };
            }

            if (!password) {
                throw { status: 400, message: "Password is required" };
            }

            const user = await User.findOne({
                where: {
                    email,
                },
            });

            if (!user) {
                throw { status: 401, message: "Invalid email / password" };
            }

            if (!checkPassword(password, user.password)) {
                throw { status: 401, message: "Invalid email / password" };
            }

            const access_token = encodeToken({
                email: user.email,
            });

            response.status(200).json({ access_token });
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
    }

    static async getAllUsers(request, response) {
        try {
            const allUsers = await User.findAll();
            response.status(200).json(allUsers);
        } catch (err) {
            response.status(500).json({
                message: "Internal server error",
            });
        }
    }

    static async getUserById(request, response) {
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

            response.status(200).json(user);
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
    }

    static async getCurrentUser(request, response) {
        try {
            response.status(200).json(request.user);
        } catch (err) {
            response.status(500).json({
                message: "Internal server error",
            });
        }
    }

    static async addUser(request, response) {
        try {
            const { email, firstName, lastName, password } = request.body;
            const newUser = await User.create({
                email,
                firstName,
                lastName,
                password: hash(password),
                role: "user",
            });
            response.status(201).json({
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
            });
        } catch (err) {
            response.status(500).json({
                message: "Internal server error",
            });
        }
    }

    static async deleteUser(request, response) {
        try {
            const { id } = request.params;
            await User.destroy({
                where: {
                    id,
                },
            });
            response.status(200).json({
                message: `User with id ${id} has been deleted!`,
            });
        } catch (err) {
            response.status(500).json({
                message: "Internal server error",
            });
        }
    }
}

module.exports = Controller;
