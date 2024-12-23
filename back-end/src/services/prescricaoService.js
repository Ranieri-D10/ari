const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PrescricaoService {
  async criarPrescricao(dadosPrescricao) {
    const { id_usuario, id_remedio, frequencia, dt_inicio, dt_fim, observacao } = dadosPrescricao;

    // Ajustar as datas para garantir que sejam armazenadas corretamente
    const dataInicio = new Date(dt_inicio);
    const dataFim = new Date(dt_fim);

    // Ajustar as horas para 00:00:00 no UTC
    dataInicio.setUTCHours(0, 0, 0, 0);
    dataFim.setUTCHours(0, 0, 0, 0);

    const remedio = await prisma.remedio.findUnique({ where: { id: id_remedio } });
    if (!remedio || !remedio.status) {
      throw new Error('Remédio não encontrado ou inativo.');
    }

    const novaPrescricao = await prisma.prescricao.create({
      data: {
        id_usuario,
        id_remedio,
        frequencia,
        dt_inicio: dataInicio.toISOString(), // Armazenar como ISO
        dt_fim: dataFim.toISOString(),       // Armazenar como ISO
        observacao,
        status: true,
      },
    });

    return novaPrescricao;
  }

  async listarPrescricoes(id_usuario) {
    return await prisma.prescricao.findMany({
      where: {
        id_usuario: id_usuario, // Certifique-se de que `id_usuario` é um número
      },
      include: {
        remedio: true, // Inclui as informações do remédio associado
      },
    });
  }

  async atualizarPrescricao(id, dadosAtualizados) {
    return await prisma.prescricao.update({
      where: { id: Number(id) },
      data: dadosAtualizados,
    });
  }

  async deletarPrescricao(id) {
    return await prisma.prescricao.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new PrescricaoService();