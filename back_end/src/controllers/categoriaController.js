const Categoria  = require('../models/categoria');
require('../database');

module.exports = {
  async store(req, res) {
    const { nome, mae_id } = req.body;

    try {
      const novaCategoria = await Categoria.create({
        nome,
        mae_id: mae_id || null
      });

      return res.status(201).json(novaCategoria);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  },

  async index(req, res) {
    try {
      const categorias = await Categoria.findAll({
        include: [
          { model: Categoria, as: 'mae' },
          { model: Categoria, as: 'filhas' }
        ]
      });

      return res.status(200).json(categorias);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }
};
