import prisma from 'prisma';

// Listar todos os usuários
export const listarUsuarios = async () => {
  return await prisma.usuario.findMany();
};

// Criar novo usuário
export const criarUsuario = async (data: { nome: string; senha: string; dt_nascimento: Date; status: boolean }) => {
  return await prisma.usuario.create({
    data: {
      nome: data.nome,
      senha: data.senha,
      dt_nascimento: data.dt_nascimento,
      status: data.status,
    },
  });
};

// Atualizar status de um usuário
export const atualizarStatusUsuario = async (id: number, status: boolean) => {
  return await prisma.usuario.update({
    where: { id },
    data: { status },
  });
};

// Deletar usuário (marcar como deletado)
export const deletarUsuario = async (id: number) => {
  return await prisma.usuario.update({
    where: { id },
    data: { status: false },
  });
};
