const Produto = require('../models/produto');
const { Op } = require('sequelize');

module.exports = {
  async index(req, res) {
    const produtos = await Produto.findAll();
    return res.json(produtos);
  },

  async store(req, res) {
    const { nome, descricao, preco, foto_url } = req.body;

    try {
      const produto = await Produto.create({
        nome,
        descricao,
        preco,
        foto_url
      });

      return res.json(produto);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao cadastrar produto" });
    }
  },

  // NOVA FUNÇÃO PARA PESQUISA
  async search(req, res) {
    const { q } = req.query;  // recebe ?q=nome

    if (!q) {
      return res.status(400).json({ erro: "Parâmetro de busca 'q' é obrigatório." });
    }

    try {
      const produtos = await Produto.findAll({
        where: {
          nome: {
            [Op.like]: `%${q}%`
          }
        }
      });

      return res.json(produtos);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao buscar produtos" });
    }
  }
};
