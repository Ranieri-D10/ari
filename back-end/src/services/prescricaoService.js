const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PrescricaoService {
  async criarPrescricao(dadosPrescricao) {
    const { id_usuario, id_remedio, frequencia, dt_inicio, dt_fim, observacao } = dadosPrescricao;
    const remedio = await prisma.remedio.findUnique({ where: { id: id_remedio } });
    if (!remedio || !remedio.status) {
      throw new Error('Remédio não encontrado ou inativo.');
    }
    const novaPrescricao = await prisma.prescricao.create({
      data: {
        id_usuario,
        id_remedio,
        frequencia,
        dt_inicio,
        dt_fim,
        observacao,
        status: true,
      },
    });
    return novaPrescricao;
  }

  async listarPrescricoes(id_usuario) {
    return await prisma.prescricao.findMany({
      where: { id_usuario: Number(id_usuario) },
      include: { remedio: true },
    });
  }

  async atualizarPrescricao(id, dadosAtualizados) {
    return await prisma.prescricao.update({
      where: { id: Number(id) },
      data: dadosAtualizados,
    });
  }
}

module.exports = new PrescricaoService();
