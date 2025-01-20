"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "users",
          "new_column",
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
          {
            transaction: t,
          }
        ),
        queryInterface.changeColumn(
          "users",
          "email",
          {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          { transaction: t }
        ),
        queryInterface.renameColumn("users", "firstName", "first_name", {
          transaction: t,
        }),
      ])
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("users", "new_column", { transaction: t }),
        queryInterface.changeColumn(
          "users",
          "email",
          {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false,
          },
          { transaction: t }
        ),
        queryInterface.renameColumn("users", "first_name", "firstName", {
          transaction: t,
        }),
      ])
    })
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
}
