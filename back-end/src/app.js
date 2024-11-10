const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');
require('dotenv').config();


// Inicializa o app Express
const app = express();

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173', // Porta onde o frontend está rodando
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
}));
app.use(express.json());

// Configuração da documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Importa rotas
const remedioRoute = require('./routes/remedioRoute');
const prescricaoRoute = require('./routes/prescricaoRoute');
const usuarioRoute = require('./routes/usuarioRoute');
const historicoRoute = require('./routes/historicoRoute');

// Usa as rotas
app.use('/api/remedios', remedioRoute);
app.use('/api/prescricoes', prescricaoRoute);
app.use('/api/usuarios', usuarioRoute);
app.use('/api/historico', historicoRoute);

// Exporta a instância do app para ser usada em outro lugar
module.exports = app;
