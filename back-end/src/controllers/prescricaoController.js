const PrescricaoService = require('../services/prescricaoService')

class PrescricaoController {

  async criarPrescricao(req, res) {
    try {
      console.log('Dados recebidos:', req.body); // Log para verificar os dados recebidos

      const novaPrescricao = await PrescricaoService.criarPrescricao({
        ...req.body,
        id_usuario: req.userId,
      });
      res.status(201).json(novaPrescricao);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listarPrescricoes(req, res) {
    try {
      const id_usuario = parseInt(req.params.id_usuario, 10); // Garante que é um número
      const prescricoes = await PrescricaoService.listarPrescricoes(id_usuario);
      res.status(200).json(prescricoes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async atualizarPrescricao(req, res) {
    try {
      const prescricaoAtualizada = await PrescricaoService.atualizarPrescricao(req.params.id, req.body);
      res.status(200).json(prescricaoAtualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }



  async deletarPrescricao(req, res) {
    try {
      await PrescricaoService.deletarPrescricao(req.params.id);
      res.status(204).send(); // No Content
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new PrescricaoController();