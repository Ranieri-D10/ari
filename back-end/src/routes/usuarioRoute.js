const express = require('express');
const { UsuarioController, autenticarToken, logout, renovarToken } = require('../controllers/usuarioController');

const router = express.Router();

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Adiciona um novo usuário ao sistema com base nas informações fornecidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object 
 *             properties:
 *               nome:
 *                 type: string
 *               senha:
 *                 type: string
 *               dt_nascimento:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 */
router.post('/', UsuarioController.criarUsuario);

// Rota protegida para listar usuários
router.get('/', autenticarToken, UsuarioController.listarUsuarios);

// Rota protegida para atualizar um usuário
router.put('/:id', autenticarToken, UsuarioController.atualizarUsuario);

// Rota de login (sem autenticação)
router.post('/login', UsuarioController.login);

// Rota de logout (com autenticação)
router.post('/logout', autenticarToken, logout);

// Nova rota para renovar o token
router.post('/renovar-token', autenticarToken, renovarToken);

module.exports = router;
