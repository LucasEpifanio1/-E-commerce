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
const Categoria = require('../models/categoria'); // ✅ maiúsculo

Usuario.init(connection);
Produto.init(connection);
Categoria.init(connection); // ✅ agora funciona

// Registra associações
Usuario.associate?.(connection.models);
Produto.associate?.(connection.models);
Categoria.associate?.(connection.models);

module.exports = connection;
