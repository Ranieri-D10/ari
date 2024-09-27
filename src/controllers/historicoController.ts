import { Request, Response } from 'express';
import * as historicoService from '../services/historicoService';

// Obter todo o histórico
export const getHistoricos = async (req: Request, res: Response) => {
  const historicos = await historicoService.listarHistoricos();
  res.json(historicos);
};

// Obter histórico por ID
export const getHistoricoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const historico = await historicoService.criarHistorico(Number(id),Date,Boolean);
  if (historico) {
    res.json(historico);
  } else {
    res.status(404).json({ error: 'Histórico não encontrado' });
  }
};

// Criar novo histórico
export const createHistorico = async (req: Request, res: Response) => {
  const { id_prescricao, dt_atual, status } = req.body;
  const historico = await historicoService.createHistorico({
    id_prescricao,
    dt_atual: new Date(dt_atual),
    status
  });
  res.status(201).json(historico);
};

// Atualizar histórico
export const updateHistorico = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id_prescricao, dt_atual, status } = req.body;
  const historico = await historicoService.updateHistorico(Number(id), {
    id_prescricao,
    dt_atual: new Date(dt_atual),
    status
  });
  res.json(historico);
};

// Deletar histórico
export const deleteHistorico = async (req: Request, res: Response) => {
  const { id } = req.params;
  await historicoService.deleteHistorico(Number(id));
  res.status(204).send(); // No Content
};
