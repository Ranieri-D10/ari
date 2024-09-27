import prisma from 'prisma';

// Obter todos os remédios
export const getAllRemedios = async () => {
  return prisma.remedio.findMany();
};

// Obter remédio por ID
export const getRemedioById = async (id: number) => {
  return prisma.remedio.findUnique({ where: { id } });
};

// Criar novo remédio
export const createRemedio = async (data: {
  nome: string,
  funcao: string,
  dosagem: number,
  status: boolean
}) => {
  return prisma.remedio.create({ data });
};

// Atualizar remédio
export const updateRemedio = async (id: number, data: {
  nome: string,
  funcao: string,
  dosagem: number,
  status: boolean
}) => {
  return prisma.remedio.update({
    where: { id },
    data
  });
};

// Deletar remédio
export const deleteRemedio = async (id: number) => {
  return prisma.remedio.delete({ where: { id } });
};
