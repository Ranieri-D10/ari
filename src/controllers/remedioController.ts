import { Request, Response } from 'express';
import * as remedioService from '../services/remedioService';

// Obter todos os remédios
export const getRemedios = async (req: Request, res: Response) => {
  const remedios = await remedioService.getAllRemedios();
  res.json(remedios);
};

// Obter remédio por ID
export const getRemedioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const remedio = await remedioService.getRemedioById(Number(id));
  if (remedio) {
    res.json(remedio);
  } else {
    res.status(404).json({ error: 'Remédio não encontrado' });
  }
};

// Criar novo remédio
export const createRemedio = async (req: Request, res: Response) => {
  const { nome, funcao, dosagem, status } = req.body;
  const remedio = await remedioService.createRemedio({ nome, funcao, dosagem, status });
  res.status(201).json(remedio);
};

// Atualizar remédio
export const updateRemedio = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, funcao, dosagem, status } = req.body;
  const remedio = await remedioService.updateRemedio(Number(id), { nome, funcao, dosagem, status });
  res.json(remedio);
};

// Deletar remédio
export const deleteRemedio = async (req: Request, res: Response) => {
  const { id } = req.params;
  await remedioService.deleteRemedio(Number(id));
  res.status(204).send(); // No Content
};
