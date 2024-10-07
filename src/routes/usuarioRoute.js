const express = require('express');
const UsuarioController = require('../controllers/usuarioController');

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

module.exports = router;
