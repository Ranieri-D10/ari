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

module.exports = router;
