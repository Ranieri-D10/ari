# ARI - Agenda de Remédios para Idosos

O projeto **ARI** tem como objetivo facilitar o agendamento e controle da administração de medicamentos para idosos. O sistema permite que os usuários registrem prescrições, acompanhem o histórico e gerenciem de forma eficaz a medicação.

## 🚀 Tecnologias Utilizadas

- **Node.js**: Plataforma para execução do código JavaScript no backend.
- **Express**: Framework para criação de APIs REST.
- **Prisma**: ORM para interação com o banco de dados.
- **Swagger**: Documentação interativa da API.
- **MySQL**: Banco de dados relacional.

## 📂 Estrutura do Projeto

- `controllers/`: Contém os controladores das rotas.
- `services/`: Implementa as regras de negócio e acesso ao banco.
- `routes/`: Define as rotas da API.
- `config/`: Configurações do Prisma Client.
- `src/`: Arquivos principais do projeto.
- `prisma/`: Esquema do banco de dados (`schema.prisma`).

## 🛠️ Como Rodar o Projeto

### Pré-requisitos

1. **Node.js** versão 16.x ou superior.
2. Banco de dados **PostgreSQL** configurado.
3. **Prisma CLI** instalado globalmente:
   ```bash
   npm install -g prisma

Passo a Passo
Clone o repositório:

   ```bash
   git clone https://github.com/Ranieri-D10/ari.git
   cd ari
   Instale as dependências:
   npm install
   ```

Configure o banco de dados: Crie um arquivo .env com a URL do banco:

   ```bash
   .env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/ari"
   ```

Rode as migrações do Prisma:

   ```bash
   npx prisma migrate dev --name init
   ```

Gere o Prisma Client:

   ```bash
   npx prisma generate
   ```

Inicie o servidor:

   ```bash
   npm start
   ```
O servidor estará disponível em http://localhost:3000.


📖 Documentação da API
Acesse a documentação em http://localhost:3000/api-docs (via Swagger).

🔍 Testando a API
Utilize ferramentas como Postman, Insomnia ou o próprio Swagger para testar os endpoints.

📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.