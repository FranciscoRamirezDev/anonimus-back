const ComentarioService = require('./comentarios.service');

class ComentarioController {
  static async crear(req, res, next) {
    try {
      const comentario = await ComentarioService.crear(req.body);
      res.status(201).json(comentario);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerTodos(req, res, next) {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const resultado = await ComentarioService.obtenerTodos(limit, offset);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerPorId(req, res, next) {
    try {
      const comentario = await ComentarioService.obtenerPorId(req.params.id);
      res.json(comentario);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    try {
      const comentario = await ComentarioService.actualizar(req.params.id, req.body);
      res.json(comentario);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req, res, next) {
    try {
      const resultado = await ComentarioService.eliminar(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ComentarioController;
