const ReaccionService = require('./reacciones.service');

class ReaccionController {
  static async crear(req, res, next) {
    try {
      const reaccion = await ReaccionService.crear(req.body);
      res.status(201).json(reaccion);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerTodos(req, res, next) {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const resultado = await ReaccionService.obtenerTodos(limit, offset);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerPorId(req, res, next) {
    try {
      const reaccion = await ReaccionService.obtenerPorId(req.params.id);
      res.json(reaccion);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    try {
      const reaccion = await ReaccionService.actualizar(req.params.id, req.body);
      res.json(reaccion);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req, res, next) {
    try {
      const resultado = await ReaccionService.eliminar(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReaccionController;
