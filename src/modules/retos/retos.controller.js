const RetoService = require('./retos.service');

class RetoController {
  static async crear(req, res, next) {
    try {
      const reto = await RetoService.crear(req.body);
      res.status(201).json(reto);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerTodos(req, res, next) {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const resultado = await RetoService.obtenerTodos(limit, offset);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerPorId(req, res, next) {
    try {
      const reto = await RetoService.obtenerPorId(req.params.id);
      res.json(reto);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    try {
      const reto = await RetoService.actualizar(req.params.id, req.body);
      res.json(reto);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req, res, next) {
    try {
      const resultado = await RetoService.eliminar(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RetoController;
