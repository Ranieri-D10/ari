import { Router } from 'express';
import * as prescricaoController from '../controllers/prescricaoController';

const router = Router();

router.get('/', prescricaoController.getPrescricao);     // Obter todos os remédios
router.get('/:id', prescricaoController.getPrescricaoById); // Obter remédio por ID
router.post('/', prescricaoController.createPrescricao);  // Criar novo remédio
router.put('/:id', prescricaoController.updatePrescricao); // Atualizar remédio
router.delete('/:id', prescricaoController.deletePrescricao); // Deletar remédio

export default router;
