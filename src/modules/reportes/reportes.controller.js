const ReportesService = require('./reportes.service');

class ReportesController {
  static async crear(req, res, next) {
    try {
      const reportes = await ReportesService.crear(req.body);
      res.status(201).json(reportes);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerTodos(req, res, next) {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 10, 100);
      const offset = Math.max(parseInt(req.query.offset) || 0, 0);
      const resultado = await ReportesService.obtenerTodos(limit, offset);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerPorId(req, res, next) {
    try {
      const reportes = await ReportesService.obtenerPorId(req.params.id);
      res.json(reportes);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    try {
      const reportes = await ReportesService.actualizar(req.params.id, req.body);
      res.json(reportes);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req, res, next) {
    try {
      const resultado = await ReportesService.eliminar(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReportesController;
