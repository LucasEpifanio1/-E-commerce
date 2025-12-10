'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('produto', 'vendedor_id');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('produto', 'vendedor_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  }
};
