const swaggerJsdoc = require('swagger-jsdoc');

// Definindo as opções para o Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Especificação do OpenAPI
    info: {
      title: 'API ARI - Agenda de Remédios para Idosos',
      version: '1.0.0',
      description: 'Documentação da API do sistema ARI',
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL base do servidor onde a API está rodando
      },
    ],
  },
  apis: ['./routes/*.js'], // Caminho dos arquivos onde estão as rotas que serão documentadas
};

// Gerando a documentação com base nas opções
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Exporta a documentação para ser usada no arquivo de inicialização do servidor
module.exports = swaggerDocs;
