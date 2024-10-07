# Projeto ARI - Agenda de Remédios para Idosos

O projeto ARI tem como objetivo facilitar o agendamento e controle da administração de remédios para idosos. O sistema permite que usuários cadastrem prescrições de medicamentos e gerenciem suas informações através de um histórico. Este projeto utiliza Node.js, Express, Prisma e Swagger.

## Tecnologias Utilizadas

- **Node.js**: Plataforma para execução do código JavaScript no backend.
- **Express**: Framework web para construção das rotas e API REST.
- **Prisma**: ORM para interação com o banco de dados MySQL.
- **Swagger**: Utilizado para documentar a API.
- **MySQL**: Banco de dados relacional.

## Estrutura do Projeto

O projeto segue uma estrutura organizada em pastas:

- `src/`: Contém os arquivos principais do projeto.
  - `controllers/`: Contém os controladores para as rotas.
  - `services/`: Contém a lógica de negócios e comunicação com o banco de dados.
  - `routes/`: Contém as rotas que conectam as requisições HTTP com os controladores.
  - `config/`: Contém o arquivo `swagger.js` e `prismaClient.js` com as configurações necessárias.
- `prisma/`: Contém o arquivo `schema.prisma` com a definição do banco de dados.

## Como Rodar o Projeto

### Pré-requisitos

1. **Node.js** instalado na versão 16.x ou superior.
2. Banco de dados **MySQL** configurado e rodando.
3. Ter o **Prisma CLI** instalado globalmente:
   ```bash
   npm install -g prisma
