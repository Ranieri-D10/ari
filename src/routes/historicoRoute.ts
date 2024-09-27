import { Router } from 'express';
import prisma from '../prismaClient';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Históricos
 *     description: Operações relacionadas ao histórico de prescrições
 * /historicos:
 *   get:
 *     summary: Listar todos os históricos
 *     tags: [Históricos]
 *     responses:
 *       200:
 *         description: Lista de históricos obtida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_prescricao:
 *                     type: integer
 *                   dt_atual:
 *                     type: string
 *                     format: datetime
 *   post:
 *     summary: Criar um novo histórico
 *     tags: [Históricos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_prescricao:
 *                 type: integer
 *                 description: ID da prescrição relacionada.
 *               dt_atual:
 *                 type: string
 *                 format: datetime
 *               status:
 *                 type: boolean
 *                 description: Status da prescrição atual.
 *     responses:
 *       201:
 *         description: Histórico criado com sucesso.
 */

router.get('/', async (req, res) => {
  const historicos = await prisma.historico.findMany();
  res.json(historicos);
});

router.post('/', async (req, res) => {
  const { id_prescricao, dt_atual, status } = req.body;
  const novoHistorico = await prisma.historico.create({
    data: {
      id_prescricao,
      dt_atual: new Date(dt_atual),
      status,
    },
  });
  res.status(201).json(novoHistorico);
});

export default router;
