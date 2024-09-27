import prisma from 'prisma';

// Listar todas as prescrições
export const listarPrescricoes = async () => {
  return await prisma.prescricao.findMany();
};

// Criar nova prescrição
export const criarPrescricao = async (data: {
  id_usuario: number;
  id_remedio: number;
  observacao: string;
  frequencia: Date;
  dt_inicio: Date;
  dt_fim: Date;
}) => {
  return await prisma.prescricao.create({
    data: {
      id_usuario: data.id_usuario,
      id_remedio: data.id_remedio,
      observacao: data.observacao,
      frequencia: data.frequencia,
      dt_inicio: data.dt_inicio,
      dt_fim: data.dt_fim,
    },
  });
};

// Atualizar uma prescrição
export const atualizarPrescricao = async (id: number, data: Partial<{
  observacao: string;
  frequencia: Date;
  dt_inicio: Date;
  dt_fim: Date;
  status: boolean;
}>) => {
  return await prisma.prescricao.update({
    where: { id },
    data,
  });
};

// Deletar uma prescrição
export const deletarPrescricao = async (id: number) => {
  return await prisma.prescricao.delete({
    where: { id },
  });
};
