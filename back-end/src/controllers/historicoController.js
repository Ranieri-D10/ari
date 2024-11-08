const HistoricoService = require('../services/historicoService');

class HistoricoController {
  async registrarHistorico(req, res) {
    try {
      const novoHistorico = await HistoricoService.registrarHistorico(req.body);
      res.status(201).json(novoHistorico);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listarHistorico(req, res) {
    try {
      const historico = await HistoricoService.listarHistorico(req.params.id_usuario);
      res.status(200).json(historico);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new HistoricoController();
