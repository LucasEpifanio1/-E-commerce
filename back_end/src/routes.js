const express = require('express');
const usuarioController = require('./controllers/usuarioController');

const routes = express.Router();

routes.post('/usuario',usuarioController.store);

module.exports = routes;
