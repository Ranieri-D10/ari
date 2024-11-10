const express = require('express');
const { UsuarioController, autenticarToken } = require('../controllers/usuarioController');

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
 *                 description: Nome do novo usuário
 *               senha:
 *                 type: string
 *                 description: Senha do novo usuário
 *               dt_nascimento:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Falha ao criar o usuário.
 */
router.post('/', UsuarioController.criarUsuario);

// Protegido por autenticação
router.get('/', autenticarToken, UsuarioController.listarUsuarios);

// Protegido por autenticação
router.put('/:id', autenticarToken, UsuarioController.atualizarUsuario);

// Rota de login (sem autenticação)
router.post('/login', UsuarioController.login);

module.exports = router;
