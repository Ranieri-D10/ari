const jwt = require('jsonwebtoken');

// Obtém a chave secreta do JWT do arquivo .env usando SECRET_JWT
const SECRET_JWT = process.env.JWT_SECRET;

// Lista negra de tokens JWT
const blacklist = [];

// Função para gerar o token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, SECRET_JWT, { expiresIn: '1h' });
};

// Função para adicionar o token à lista negra
const blacklistToken = (token) => {
    blacklist.push(token);
};

// Função para verificar e decodificar o token JWT
const verifyToken = (token) => {
    if (blacklist.includes(token)) {
        throw new Error('Token inválido');
    }
    return jwt.verify(token, SECRET_JWT);
};

// Exporta as funções
module.exports = { generateToken, verifyToken, blacklistToken };