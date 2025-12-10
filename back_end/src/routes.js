const express = require('express');
const usuarioController = require('./controllers/usuarioController');
const ProdutoController = require("./controllers/produtoController");
const routes = express.Router();

routes.post('/usuario', usuarioController.store);
//produto
routes.post("/produto", ProdutoController.store);
routes.get("/produtos", ProdutoController.index);
module.exports = routes;
