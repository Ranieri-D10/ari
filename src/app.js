const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');
const env = require('dotenv').config();


// Inicializa o app Express
const app = express();

// Middlewares
app.use(express.json());

// Configuração da documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Importa rotas
const remedioRoute = require('./routes/remedioRoute');
const prescricaoRoute = require('./routes/prescricaoRoute');
const usuarioRoute = require('./routes/usuarioRoute');
const historicoRoute = require('./routes/historicoRoute');

// Usa as rotas
app.use('/remedios', remedioRoute);
app.use('/prescricoes', prescricaoRoute);
app.use('/usuarios', usuarioRoute);
app.use('/historico', historicoRoute);

// Exporta a instância do app para ser usada em outro lugar
module.exports = app;
