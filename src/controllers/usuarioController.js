const UsuarioService = require('../services/usuarioService');

class UsuarioController {
  async criarUsuario(req, res) {
    try {
      const novoUsuario = await UsuarioService.criarUsuario(req.body);
      res.status(201).json(novoUsuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listarUsuarios(req, res) {
    try {
      const usuarios = await UsuarioService.listarUsuarios();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async atualizarUsuario(req, res) {
    try {
      const usuarioAtualizado = await UsuarioService.atualizarUsuario(req.params.id, req.body);
      res.status(200).json(usuarioAtualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UsuarioController();
