const { EstoqueMovimentacao, Produto } = require("../models/estoque_movimentacao");

module.exports = {
  
  // Registrar entrada no estoque
  async entrada(req, res) {
    const { produto_id, quantidade } = req.body;

    if (!produto_id || !quantidade)
      return res.status(400).json({ error: "produto_id e quantidade são obrigatórios" });

    if (quantidade <= 0)
      return res.status(400).json({ error: "Quantidade deve ser maior que zero" });

    try {
      const produto = await Produto.findByPk(produto_id);
      if (!produto) return res.status(404).json({ error: "Produto não encontrado" });

      const mov = await EstoqueMovimentacao.create({
        produto_id,
        quantidade
      });

      return res.json({ message: "Entrada registrada", movimentacao: mov });

    } catch (erro) {
      return res.status(500).json({ error: "Erro ao registrar entrada", detalhe: erro.message });
    }
  },

  // Registrar retirada (quantidade negativa)
  async retirada(req, res) {
    const { produto_id, quantidade } = req.body;

    if (!produto_id || !quantidade)
      return res.status(400).json({ error: "produto_id e quantidade são obrigatórios" });

    if (quantidade <= 0)
      return res.status(400).json({ error: "Quantidade deve ser maior que zero" });

    try {
      const produto = await Produto.findByPk(produto_id);
      if (!produto) return res.status(404).json({ error: "Produto não encontrado" });

      const mov = await EstoqueMovimentacao.create({
        produto_id,
        quantidade: quantidade * -1
      });

      return res.json({ message: "Retirada registrada", movimentacao: mov });

    } catch (erro) {
      return res.status(500).json({ error: "Erro ao registrar retirada", detalhe: erro.message });
    }
  },

  // Listar todas movimentações
  async listar(req, res) {
    try {
      const movs = await EstoqueMovimentacao.findAll({
        include: [{ model: Produto, as: "produto" }]
      });

      return res.json(movs);
    } catch (erro) {
      return res.status(500).json({ error: "Erro ao listar movimentações" });
    }
  },

  // Listar movimentações de um produto
  async listarPorProduto(req, res) {
    const { id } = req.params;

    try {
      const movs = await EstoqueMovimentacao.findAll({
        where: { produto_id: id },
        include: [{ model: Produto, as: "produto" }]
      });

      return res.json(movs);
    } catch (erro) {
      return res.status(500).json({ error: "Erro ao listar movimentações do produto" });
    }
  }
};
