const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UsuarioService {
  async criarUsuario(dadosUsuario) {
    const { nome, email, senha, dt_nascimento, status } = dadosUsuario;
    if (!nome || !senha || ! email) {
      throw new Error('Nome, senha e email são obrigatórios');
    }
    const novoUsuario = await prisma.usuario.create({
      data: { nome,
        email, 
        senha, 
        dt_nascimento: new Date(dt_nascimento),
        status, },
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
    return prisma.usuario.findFirst({
      where: {
        OR: [
          { email: email || undefined },  // Se email for fornecido
          { nome: nome || undefined }     // Se nome for fornecido
        ]
      }
    });
  }
  
}

module.exports = new UsuarioService();
