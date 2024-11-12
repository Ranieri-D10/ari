// services/usuarioService.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UsuarioService {
  async criarUsuario(dadosUsuario) {
    const { nome, email, senha, dt_nascimento, status = true } = dadosUsuario;
    if (!nome || !senha || !email) {
      throw new Error('Nome, senha e email são obrigatórios');
    }
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
        dt_nascimento: new Date(dt_nascimento),
        status,
      },
    });
    return novoUsuario;
  }

  async listarUsuarios() {
    return await prisma.usuario.findMany();
  }

  async atualizarUsuario(id, dadosAtualizados) {
    return await prisma.usuario.update({
      where: { id: Number(id) },
      data: dadosAtualizados,
    });
  }

  async buscarPorEmailOuNome(email, nome) {
    if (!email && !nome) {
      throw new Error('Email ou nome devem ser fornecidos para buscar o usuário.');
    }
    return prisma.usuario.findFirst({
      where: {
        OR: [
          email ? { email } : null,
          nome ? { nome } : null
        ].filter(Boolean) // Remove entradas nulas
      }
    });
  }
}

module.exports = new UsuarioService();
