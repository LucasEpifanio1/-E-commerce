const { Produto } = require('../database');

module.exports = {
  async store(req, res) {
    const { nome, descricao, preco, foto_url, vendedor_id } = req.body;

    try {
      const novoProduto = await Produto.create({
        nome,
        descricao,
        preco,
        foto_url,
        vendedor_id
      });

      return res.status(201).json(novoProduto);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }
};
