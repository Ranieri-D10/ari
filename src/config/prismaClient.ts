import { PrismaClient } from '@prisma/client';

const prismatest = new PrismaClient();

// Exportar a instância do PrismaClient para ser usada em outros módulos
export default prismatest;
