const ReaccionesService = require('./reacciones.service');

class ReaccionesController {
  static async crear(req, res, next) {
    try {
      const reacciones = await ReaccionesService.crear(req.body);
      res.status(201).json(reacciones);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerTodos(req, res, next) {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 10, 100);
      const offset = Math.max(parseInt(req.query.offset) || 0, 0);
      const resultado = await ReaccionesService.obtenerTodos(limit, offset);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerPorId(req, res, next) {
    try {
      const reacciones = await ReaccionesService.obtenerPorId(req.params.id);
      res.json(reacciones);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    try {
      const reacciones = await ReaccionesService.actualizar(req.params.id, req.body);
      res.json(reacciones);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req, res, next) {
    try {
      const resultado = await ReaccionesService.eliminar(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReaccionesController;
