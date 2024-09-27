import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes';
import prescricaoRoutes from './routes/prescricaoRoutes';
import historicoRoutes from './routes/historicoRoutes';
import remedioRoutes from './routes/remedioRoutes';

const app = express();
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/prescricoes', prescricaoRoutes);
app.use('/historicos', historicoRoutes);
app.use('/remedios', remedioRoutes);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
