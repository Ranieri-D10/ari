const UsuarioService = require('../services/usuarioService');
const jwtConfig = require('../config/jwtConfig');
const bcrypt = require('bcrypt');


class UsuarioController {
  async criarUsuario(req, res) {
    try {
      // Criptografando a senha recebida no corpo da requisição
      const { senha } = req.body;
      const senhaCriptografada = await bcrypt.hash(senha, 10);

      // Substituindo a senha original pela criptografada
      const novoUsuario = await UsuarioService.criarUsuario({
        ...req.body,
        senha: senhaCriptografada
      });

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


  async login(req, res) {
    try {
      const { email, nome, senha } = req.body;
  
      // Buscando o usuário por email ou nome
      const usuario = await UsuarioService.buscarPorEmailOuNome(email, nome);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      // Comparando a senha
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ message: 'Senha inválida' });
      }
  
      // Gerar e retornar o token JWT
      const token = jwtConfig.generateToken(usuario.id);
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarPorEmail(email) {
    return prisma.usuario.findUnique({
      where: { email }
    });
  }

  }

  const autenticarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.sendStatus(401);
  
    try {
      const user = jwtConfig.verifyToken(token);
      req.user = user;
      next();
    } catch (error) {
      return res.sendStatus(403);
    }
  };
  
  const logout = async (req, res) => {
    try {
    const token = req.headers['authorization'].split(' ')[1];
    jwtConfig.blacklistToken(token);
    res.status(200).json({ message: 'Logout realizado com sucesso'
    });
    } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar logout.' });
    }
    }

  module.exports = { UsuarioController: new UsuarioController(), autenticarToken };