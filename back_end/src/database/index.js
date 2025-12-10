const Sequelize = require('sequelize');
const config = require('../config/database');

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

// Inicializa os modelos
const Produto = require('../models/produto')(connection, Sequelize.DataTypes);
const Usuario = require('../models/produto')(connection, Sequelize.DataTypes);

// Associação
Produto.belongsTo(Usuario, { foreignKey: 'vendedor_id', as: 'vendedor' });

module.exports = { connection, Produto, Usuario };
