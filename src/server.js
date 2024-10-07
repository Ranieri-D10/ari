const app = require('./app'); // Importa o app.js, que contém toda a configuração do Express

// Define a porta do servidor
const PORT = process.env.PORT || 3000;

// Inicializa o servidor e escuta na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
