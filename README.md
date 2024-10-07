# Projeto ARI - Agenda de Remédios para Idosos

O projeto ARI tem como objetivo facilitar o agendamento e controle da administração de remédios para idosos. O sistema permite que usuários cadastrem prescrições de medicamentos e os gerenciem através de um histórico. Este projeto utiliza Node.js, Express, Prisma e Swagger.

## Tecnologias Utilizadas

- **Node.js**: Plataforma para execução do código JavaScript no backend.
- **Express**: Framework web para construção das rotas e API REST.
- **Prisma**: ORM para interação com o banco de dados.
- **Swagger**: Utilizado para documentar a API.
- **MySQL**: Banco de dados relacional.

## Estrutura do Projeto

O projeto segue uma estrutura organizada em pastas:

- `controllers/`: Contém os controladores para as rotas.
- `services/`: Contém as regras de negócio e comunicação com o banco de dados.
- `routes/`: Contém as rotas que conectam as requisições HTTP com os controladores.
- `config/`: Configuração do Prisma Client para conexão com o banco de dados.
- `src/`: Contém os arquivos principais do projeto.
- `prisma/`: Contém o arquivo `schema.prisma` com a definição do banco de dados.

## Como Rodar o Projeto

### Pré-requisitos

1. **Node.js** instalado na versão 16.x ou superior.
2. Banco de dados **PostgreSQL** configurado e rodando.
3. Ter o **Prisma CLI** instalado globalmente:
   ```bash
   npm install -g prisma
   ```

### Passo a Passo

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/ari.git
   cd ari
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configure o banco de dados**:

   Crie um arquivo `.env` na raiz do projeto com a URL de conexão ao banco de dados. Exemplo de configuração:

   ```
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/ari"
   ```

4. **Rode as migrações do Prisma** para criar as tabelas no banco de dados:

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Gere o Prisma Client**:

   ```bash
   npx prisma generate
   ```

6. **Inicie o servidor**:

   ```bash
   npm start
   ```

O servidor estará rodando em `http://localhost:3000`.

### Documentação da API

A documentação da API pode ser acessada via Swagger em: `http://localhost:3000/api-docs`.

## Testando a API

Você pode testar a API usando ferramentas como **Postman** ou **Insomnia**, ou diretamente pelo Swagger.

### Endpoints Principais:

1. **Usuários**:
   - `POST /api/usuarios`: Cria um novo usuário.
   - `GET /api/usuarios`: Lista todos os usuários.
   - `PUT /api/usuarios/:id`: Atualiza um usuário existente.

2. **Prescrições**:
   - `POST /api/prescricoes`: Cria uma nova prescrição.
   - `GET /api/prescricoes/:id_usuario`: Lista as prescrições de um usuário.
   - `PUT /api/prescricoes/:id`: Atualiza uma prescrição existente.

3. **Remédios**:
   - `POST /api/remedios`: Cadastra um novo remédio.
   - `GET /api/remedios`: Lista todos os remédios.
   - `PUT /api/remedios/:id`: Atualiza as informações de um remédio.

4. **Histórico**:
   - `POST /api/historico`: Registra um histórico de uso de prescrição.
   - `GET /api/historico/:id_usuario`: Lista o histórico de um usuário.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
