const { PrismaClient } = require('@prisma/client');

// Cria a instância do Prisma Client
const prisma = new PrismaClient();

// Exporta o prisma para ser usado em outros arquivos
module.exports = prisma;
