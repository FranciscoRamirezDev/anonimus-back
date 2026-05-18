const PublicacionesService = require('./publicaciones.service');

class PublicacionesController {
  static async crear(req, res, next) {
    try {
      const data = {
        ...req.body,
        id_usuario: req.user.id_usuario,
      };
      const publicaciones = await PublicacionesService.crear(data);
      res.status(201).json(publicaciones);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerTodos(req, res, next) {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 10, 100);
      const offset = Math.max(parseInt(req.query.offset) || 0, 0);
      const resultado = await PublicacionesService.obtenerTodos(limit, offset);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerPorId(req, res, next) {
    try {
      const publicaciones = await PublicacionesService.obtenerPorId(req.params.id);
      res.json(publicaciones);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    try {
      const publicaciones = await PublicacionesService.actualizar(req.params.id, req.body);
      res.json(publicaciones);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req, res, next) {
    try {
      const resultado = await PublicacionesService.eliminar(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PublicacionesController;
