const express = require("express");
const routes = express.Router();

// Controllers
const usuarioController = require("./controllers/usuarioController");
const ProdutoController = require("./controllers/ProdutoController");
const categoriaController = require("./controllers/categoriaController");
const estoqueController = require("./controllers/estoqueController");

// -----------------------------
// USUÁRIO
// -----------------------------
routes.post('/usuario', usuarioController.store);

// -----------------------------
// PRODUTO
// -----------------------------
routes.post('/produto', ProdutoController.store);
routes.get('/produtos', ProdutoController.index);


// -----------------------------
// CATEGORIA
// -----------------------------
routes.post('/categoria', categoriaController.store);
routes.get('/categoria', categoriaController.index);

// -----------------------------
// ESTOQUE (entradas e retiradas)
// -----------------------------
routes.post("/estoque/entrada", estoqueController.entrada);   // corrigido
routes.post("/estoque/retirada", estoqueController.retirada); // corrigido
routes.get("/estoque", estoqueController.listar);
routes.get("/estoque/:id", estoqueController.listarPorProduto);

module.exports = routes;
