const { Sequelize } = require('sequelize');
const config = require('../config/database');

// Cria a conexão
const connection = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Importa e inicializa o model Usuario
const Usuario = require('../models/usuario');
const Produto = require('../models/produto');
Usuario.init(connection);
Produto.init(connection);

module.exports = connection;
