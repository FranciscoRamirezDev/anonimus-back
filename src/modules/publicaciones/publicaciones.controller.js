const PublicacionService = require('./publicaciones.service');

class PublicacionController {
  static async crear(req, res, next) {
    try {
      const publicacion = await PublicacionService.crear(req.body);
      res.status(201).json(publicacion);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerTodos(req, res, next) {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const resultado = await PublicacionService.obtenerTodos(limit, offset);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerPorId(req, res, next) {
    try {
      const publicacion = await PublicacionService.obtenerPorId(req.params.id);
      res.json(publicacion);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    try {
      const publicacion = await PublicacionService.actualizar(req.params.id, req.body);
      res.json(publicacion);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req, res, next) {
    try {
      const resultado = await PublicacionService.eliminar(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PublicacionController;
