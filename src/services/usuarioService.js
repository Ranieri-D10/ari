const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UsuarioService {
  async criarUsuario(dadosUsuario) {
    const { nome, senha, dt_nascimento, status } = dadosUsuario;
    if (!nome || !senha) {
      throw new Error('Nome e senha são obrigatórios');
    }
    const novoUsuario = await prisma.usuario.create({
      data: { nome, 
        senha, 
        dt_nascimento: new Date(dt_nascimento),
        status },
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
}

module.exports = new UsuarioService();
