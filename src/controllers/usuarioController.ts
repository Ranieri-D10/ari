import { Request, Response } from 'express';
import * as usuarioService from '../services/usuarioService';

// Obter todos os usuários
export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await usuarioService.getAllUsuarios();
  res.json(usuarios);
};

// Obter usuário por ID
export const getUsuarioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await usuarioService.getUsuarioById(Number(id));
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ error: 'Usuário não encontrado' });
  }
};

// Criar um novo usuário
export const createUsuario = async (req: Request, res: Response) => {
  const { nome, senha, dt_nascimento, status } = req.body;
  const usuario = await usuarioService.createUsuario({ nome, senha, dt_nascimento, status });
  res.status(201).json(usuario);
};

// Atualizar usuário
export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, senha, dt_nascimento, status } = req.body;
  const usuario = await usuarioService.updateUsuario(Number(id), { nome, senha, dt_nascimento, status });
  res.json(usuario);
};

// Deletar usuário
export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  await usuarioService.deleteUsuario(Number(id));
  res.status(204).send(); // No Content
};
