const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class RemedioService {
  async criarRemedio(dadosRemedio) {
    const { nome, funcao, dosagem, status } = dadosRemedio;
    if (!nome || !funcao) {
      throw new Error('Nome e função do remédio são obrigatórios');
    }
    const novoRemedio = await prisma.remedio.create({
      data: {
        nome,
        funcao,
        dosagem: parseFloat(dosagem), // Converter dosagem para float
        status: true
      },
    });
    return novoRemedio;
  }

  async listarRemedios() {
    return await prisma.remedio.findMany();
  }

  async atualizarRemedio(id, dadosAtualizados) {
    if (dadosAtualizados.dosagem) {
      dadosAtualizados.dosagem = parseFloat(dadosAtualizados.dosagem); // Converter dosagem para float
    }
    return await prisma.remedio.update({
      where: { id: Number(id) },
      data: dadosAtualizados,
    });
  }

  async deletarRemedio(id) {
    return await prisma.remedio.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new RemedioService();
