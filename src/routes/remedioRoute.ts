import { Router } from 'express';
import * as remedioController from '../controllers/remedioController';

const router = Router();

router.get('/', remedioController.getRemedios);     // Obter todos os remédios
router.get('/:id', remedioController.getRemedioById); // Obter remédio por ID
router.post('/', remedioController.createRemedio);  // Criar novo remédio
router.put('/:id', remedioController.updateRemedio); // Atualizar remédio
router.delete('/:id', remedioController.deleteRemedio); // Deletar remédio

export default router;
