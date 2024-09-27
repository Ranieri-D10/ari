import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController.ts';

const router = Router();

router.get('/', usuarioController.getUsuarios);     // Obter todos os usuários
router.get('/:id', usuarioController.getUsuarioById); // Obter usuário por ID
router.post('/', usuarioController.createUsuario);  // Criar um novo usuário
router.put('/:id', usuarioController.updateUsuario); // Atualizar usuário
router.delete('/:id', usuarioController.deleteUsuario); // Deletar usuário

export default router;