'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      createdat: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updatedat: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      }
    });

    await queryInterface.sequelize.query(`
  CREATE OR REPLACE FUNCTION update_updatedat_column()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updatedat = NOW();
    RETURN NEW;
  END;
  $$ language 'plpgsql';
`);

    await queryInterface.sequelize.query(`
  CREATE TRIGGER update_user_updatedat
  BEFORE UPDATE ON "users"
  FOR EACH ROW
  EXECUTE PROCEDURE update_updatedat_column();
`);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};


