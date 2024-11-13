const UsuarioService = require('../services/usuarioService');
const jwtConfig = require('../config/jwtConfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UsuarioController {
  async criarUsuario(req, res) {
    try {
      const { senha, dt_nascimento, ...resto } = req.body;
      const senhaCriptografada = await bcrypt.hash(senha, 10);
      const nascimentoValido = new Date(dt_nascimento);

      if (isNaN(nascimentoValido.getTime())) {
        return res.status(400).json({ error: 'Data de nascimento inválida' });
      }

      const novoUsuario = await UsuarioService.criarUsuario({
        ...resto,
        senha: senhaCriptografada,
        dt_nascimento: nascimentoValido,
      });

      res.status(201).json(novoUsuario);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async listarUsuarios(req, res) {
    try {
      const usuarios = await UsuarioService.listarUsuarios();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async atualizarUsuario(req, res) {
    try {
      const { dt_nascimento, senha, ...resto } = req.body;
      let senhaCriptografada = undefined;

      if (senha) {
        senhaCriptografada = await bcrypt.hash(senha, 10);
      }

      let nascimentoValido = undefined;
      if (dt_nascimento) {
        nascimentoValido = new Date(dt_nascimento);
        if (isNaN(nascimentoValido.getTime())) {
          return res.status(400).json({ error: 'Data de nascimento inválida' });
        }
      }

      const usuarioAtualizado = await UsuarioService.atualizarUsuario(req.params.id, {
        ...resto,
        senha: senhaCriptografada || undefined,
        dt_nascimento: nascimentoValido || undefined,
      });

      res.status(200).json(usuarioAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
      }

      const usuario = await UsuarioService.buscarPorEmail(email);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ message: 'Senha inválida.' });
      }

      const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token, userId: usuario.id });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  }
}

// Função de autenticação de token
const autenticarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = user.id; // Passa o ID do usuário para uso nas rotas
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

// Função de renovar o token
const renovarToken = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });

    const agora = Math.floor(Date.now() / 1000);
    const tempoRestante = payload.exp - agora;

    if (tempoRestante <= 600) { // Renova se restam menos de 10 minutos
      const novoToken = jwt.sign({ id: payload.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token: novoToken });
    }

    res.status(200).json({ message: 'Token ainda válido.', tokenAtual: token });
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado.', error: err.message });
  }
};

// Função de logout
const logout = (req, res) => {
  res.status(200).json({ message: 'Logout realizado com sucesso' });
};

module.exports = { UsuarioController: new UsuarioController(), autenticarToken, renovarToken, logout };
