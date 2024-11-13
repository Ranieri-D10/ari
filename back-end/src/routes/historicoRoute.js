const express = require('express');
const HistoricoController = require('../controllers/historicoController');
const authenticateToken = require('../middlewares/authMiddleware')

const router = express.Router();

/**
 * @swagger
 * /historico:
 *   post:
 *     summary: Registra um novo histórico
 *     description: Adiciona um novo registro de histórico ao sistema.
 *     responses:
 *       201:
 *         description: Histórico criado com sucesso.
 *       400:
 *         description: Erro ao criar histórico.
 */
router.post('/', authenticateToken, HistoricoController.registrarHistorico);

/**
 * @swagger
 * /historico/{id_usuario}:
 *   get:
 *     summary: Lista o histórico de um usuário
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de histórico retornada.
 */
router.get('/:id_usuario', authenticateToken, HistoricoController.listarHistorico);

module.exports = router;
