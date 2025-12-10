const Produto = require("../models/produto");

module.exports = {
  async index(req, res) {
    const produtos = await Produto.findAll();
    return res.json(produtos);
  },

  async store(req, res) {
    try {
      const { nome, descricao, preco, foto_url } = req.body;

      const produto = await Produto.create({
        nome,
        descricao,
        preco,
        foto_url,
        
      });

      return res.status(201).json(produto);
    } catch (err) {
      return res.status(400).json({
        error: "Erro ao criar produto",
        detalhes: err.message,
      });
      
    }
    
  }
};
