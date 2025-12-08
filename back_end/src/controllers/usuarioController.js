const User = require('../models/usuario');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },

  async store(req, res) {
    const { nome, email, senha } = req.body;

    try {
      const user = await User.create({ nome, email, senha });
      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }
};
