const ComunidadService = require('./comunidades.service');

class ComunidadController {
  static async crear(req, res, next) {
    try {
      const comunidad = await ComunidadService.crear(req.body);
      res.status(201).json(comunidad);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerTodos(req, res, next) {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const resultado = await ComunidadService.obtenerTodos(limit, offset);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerPorId(req, res, next) {
    try {
      const comunidad = await ComunidadService.obtenerPorId(req.params.id);
      res.json(comunidad);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    try {
      const comunidad = await ComunidadService.actualizar(req.params.id, req.body);
      res.json(comunidad);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req, res, next) {
    try {
      const resultado = await ComunidadService.eliminar(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ComunidadController;
