"use strict";

const { hash } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        let user = [
            {
                email: "admin@taphomestest.com",
                password: "admin123",
                role: "admin",
                firstName: "admin",
                lastName: "admin",
            },
        ];

        user = user.map((el) => {
            el.password = hash(el.password);
            el.createdAt = new Date();
            el.updatedAt = new Date();
            return el;
        });
        await queryInterface.bulkInsert("Users", user, null);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Users", null, {});
    },
};
