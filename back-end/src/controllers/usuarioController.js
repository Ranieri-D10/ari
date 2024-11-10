const UsuarioService = require('../services/usuarioService');
const jwtConfig = require('../config/jwtConfig');
const bcrypt = require('bcrypt');

class UsuarioController {
  async criarUsuario(req, res) {
    try {
      const { senha, dt_nascimento, ...resto } = req.body;

      // Criptografando a senha recebida no corpo da requisição
      const senhaCriptografada = await bcrypt.hash(senha, 10);

      // Validação adicional para o campo dt_nascimento
      const nascimentoValido = new Date(dt_nascimento);
      if (isNaN(nascimentoValido.getTime())) {
        return res.status(400).json({ error: 'Data de nascimento inválida' });
      }

      // Substituindo a senha original pela criptografada
      const novoUsuario = await UsuarioService.criarUsuario({
        ...resto,
        senha: senhaCriptografada,
        dt_nascimento: nascimentoValido, // Enviar em formato Date
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

      // Atualizar senha se fornecida
      let senhaCriptografada = undefined;
      if (senha) {
        senhaCriptografada = await bcrypt.hash(senha, 10);
      }

      // Atualizar data de nascimento se fornecida
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
      const { email, nome, senha } = req.body;

      // Verificar se pelo menos email ou nome foram fornecidos
      if (!email && !nome) {
        return res.status(400).json({ message: 'Por favor, forneça um email ou nome.' });
      }

      // Log de dados recebidos
      console.log("Dados de login recebidos:", { email, nome });

      // Buscando o usuário por email ou nome
      const usuario = await UsuarioService.buscarPorEmailOuNome(email, nome);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Log do usuário encontrado
      console.log("Usuário encontrado:", usuario);

      // Comparando a senha usando bcrypt
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ message: 'Senha inválida' });
      }

      // Gerar e retornar o token JWT
      const token = jwtConfig.generateToken(usuario.id);
      console.log("Token JWT gerado:", token); // Log para depuração
      res.status(200).json({ token });
    } catch (error) {
      console.error("Erro ao fazer login:", error.stack || error);
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
    const user = jwtConfig.verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

// Função de logout
const logout = async (req, res) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    jwtConfig.blacklistToken(token);
    res.status(200).json({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    console.error("Erro ao realizar logout:", error);
    res.status(500).json({ error: 'Erro ao realizar logout.' });
  }
};

module.exports = { UsuarioController: new UsuarioController(), autenticarToken };
