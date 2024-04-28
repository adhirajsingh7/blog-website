"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      "post_categories",
      {
        category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "categories", // tablename is used here
            key: "id",
          },
        },
        post_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "posts", // tablename is used here
            key: "id",
          },
        },
      },
      {
        timestamps: false,
      }
    );
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("post_categories");
  },
};
