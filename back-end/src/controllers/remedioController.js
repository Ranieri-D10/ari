const RemedioService = require('../services/remedioService');

class RemedioController {
  async criarRemedio(req, res) {
    try {
      const novoRemedio = await RemedioService.criarRemedio(req.body);
      res.status(201).json(novoRemedio);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listarRemedios(req, res) {
    try {
      const remedios = await RemedioService.listarRemedios();
      res.status(200).json(remedios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async atualizarRemedio(req, res) {
    try {
      const remedioAtualizado = await RemedioService.atualizarRemedio(req.params.id, req.body);
      res.status(200).json(remedioAtualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new RemedioController();
