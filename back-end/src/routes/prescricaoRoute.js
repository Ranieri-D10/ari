const express = require('express');
const PrescricaoController = require('../controllers/prescricaoController');

const router = express.Router();

/**
 * @swagger
 * /prescricoes:
 *   post:
 *     summary: Cria uma nova prescrição
 *     description: Adiciona uma nova prescrição ao sistema.
 *     responses:
 *       201:
 *         description: Prescrição criada com sucesso.
 *       400:
 *         description: Erro ao criar prescrição.
 */
router.post('/', PrescricaoController.criarPrescricao);

/**
 * @swagger
 * /prescricoes/{id_usuario}:
 *   get:
 *     summary: Lista as prescrições de um usuário
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de prescrições retornada.
 */
router.get('/:id_usuario', PrescricaoController.listarPrescricoes);

/**
 * @swagger
 * /prescricoes/{id}:
 *   delete:
 *     summary: Deleta uma prescrição existente
 *     description: Remove uma prescrição do sistema pelo ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da prescrição a ser deletada.
 *     responses:
 *       204:
 *         description: Prescrição deletada com sucesso.
 *       400:
 *         description: Erro ao deletar prescrição.
 */
router.delete('/:id', PrescricaoController.deletarPrescricao);

module.exports = router;