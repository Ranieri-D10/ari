import prisma from 'prisma';

// Listar todos os históricos
export const listarHistoricos = async () => {
  return await prisma.historico.findMany();
};

// Criar novo histórico
export const criarHistorico = async (data: { id_prescricao: number; dt_atual: Date; status: boolean }) => {
  return await prisma.historico.create({
    data: {
      id_prescricao: data.id_prescricao,
      dt_atual: data.dt_atual,
      status: data.status,
    },
  });
};

// Atualizar histórico
export const atualizarHistorico = async (id: number, data: Partial<{ dt_atual: Date; status: boolean }>) => {
  return await prisma.historico.update({
    where: { id },
    data,
  });
};

// Deletar histórico
export const deletarHistorico = async (id: number) => {
  return await prisma.historico.delete({
    where: { id },
  });
};
