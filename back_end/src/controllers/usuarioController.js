const Usuario = require('../models/usuario');
require('../database'); // garante que o model foi inicializado

module.exports = {
  async store(req, res) {
    const { nome, email, senha } = req.body;

    try {
      const novoUsuario = await Usuario.create({
        nome,
        email,
        senha
      });

      return res.json(novoUsuario);

    } catch (error) {
      return res.status(400).json({
        error: 'Erro ao criar usuário',
        detalhes: error.message
      });
    }
  }
};
