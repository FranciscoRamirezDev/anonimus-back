const ReporteService = require('./reportes.service');

class ReporteController {
  static async crear(req, res, next) {
    try {
      const reporte = await ReporteService.crear(req.body);
      res.status(201).json(reporte);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerTodos(req, res, next) {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const resultado = await ReporteService.obtenerTodos(limit, offset);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerPorId(req, res, next) {
    try {
      const reporte = await ReporteService.obtenerPorId(req.params.id);
      res.json(reporte);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    try {
      const reporte = await ReporteService.actualizar(req.params.id, req.body);
      res.json(reporte);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req, res, next) {
    try {
      const resultado = await ReporteService.eliminar(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReporteController;
