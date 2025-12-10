const express = require('express');
const usuarioController = require('./controllers/usuarioController');
const produtoController = require('./controllers/produtoController');
const routes = express.Router();

//usuario
routes.post('/usuario',usuarioController.store);

//produto
routes.post('/produtos',produtoController.store);

module.exports = routes;
