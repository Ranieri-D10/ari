const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class RemedioService {
  async criarRemedio(dadosRemedio) {
    const { nome, funcao, dosagem, status } = dadosRemedio;
    if (!nome || !funcao) {
      throw new Error('Nome e função do remédio são obrigatórios');
    }
    const novoRemedio = await prisma.remedio.create({
      data: { nome, funcao, dosagem, status },
    });
    return novoRemedio;
  }

  async listarRemedios() {
    return await prisma.remedio.findMany();
  }

  async atualizarRemedio(id, dadosAtualizados) {
    return await prisma.remedio.update({
      where: { id: Number(id) },
      data: dadosAtualizados,
    });
  }
}

module.exports = new RemedioService();
