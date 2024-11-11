const express = require('express');
const RemedioController = require('../controllers/remedioController');

const router = express.Router();

/**
 * @swagger
 * /remedios:
 *   post:
 *     summary: Cria um novo remédio
 *     description: Adiciona um novo remédio ao sistema.
 *     responses:
 *       201:
 *         description: Remédio criado com sucesso.
 *       400:
 *         description: Erro ao criar remédio.
 */
router.post('/', RemedioController.criarRemedio);

/**
 * @swagger
 * /remedios:
 *   get:
 *     summary: Lista todos os remédios
 *     responses:
 *       200:
 *         description: Lista de remédios retornada.
 */
router.get('/', RemedioController.listarRemedios);

/**
 * @swagger
 * /remedios/{id}:
 *   put:
 *     summary: Atualiza um remédio existente
 *     description: Atualiza os dados de um remédio pelo ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do remédio a ser atualizado.
 *     responses:
 *       200:
 *         description: Remédio atualizado com sucesso.
 *       400:
 *         description: Erro ao atualizar remédio.
 */
router.put('/:id', RemedioController.atualizarRemedio);

/**
 * @swagger
 * /remedios/{id}:
 *   delete:
 *     summary: Deleta um remédio existente
 *     description: Remove um remédio do sistema pelo ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do remédio a ser deletado.
 *     responses:
 *       204:
 *         description: Remédio deletado com sucesso.
 *       400:
 *         description: Erro ao deletar remédio.
 */
router.delete('/:id', RemedioController.deletarRemedio);

module.exports = router;