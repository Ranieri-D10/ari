const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class HistoricoService {
  async registrarHistorico(dadosHistorico) {
    const { id_prescricao, dt_atual, status } = dadosHistorico;
    const prescricao = await prisma.prescricao.findUnique({ where: { id: id_prescricao } });
    if (!prescricao) {
      throw new Error('Prescrição não encontrada.');
    }
    const novoHistorico = await prisma.historico.create({
      data: { id_prescricao, dt_atual, status },
    });
    return novoHistorico;
  }

  async listarHistorico(id_usuario) {
    return await prisma.historico.findMany({
      where: {
        prescricao: { id_usuario: Number(id_usuario) },
      },
      include: { prescricao: true },
    });
  }
}

module.exports = new HistoricoService();
