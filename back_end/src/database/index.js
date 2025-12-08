const Sequelize = require('sequelize');
const config = require('../config/database');

const Usuario = require('../models/usuario');

const connection = new Sequelize(config);

Usuario.init(connection);

module.exports = connection;
