const ComentariosService = require('./comentarios.service');

class ComentariosController {
  static async crear(req, res, next) {
    try {
      // Agregar id_usuario del token JWT al body
      const data = {
        ...req.body,
        id_usuario: req.user.id_usuario,
      };
      const comentarios = await ComentariosService.crear(data);
      res.status(201).json(comentarios);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerTodos(req, res, next) {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 10, 100);
      const offset = Math.max(parseInt(req.query.offset) || 0, 0);
      const resultado = await ComentariosService.obtenerTodos(limit, offset);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerPorId(req, res, next) {
    try {
      const comentarios = await ComentariosService.obtenerPorId(req.params.id);
      res.json(comentarios);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    try {
      const comentarios = await ComentariosService.actualizar(req.params.id, req.body);
      res.json(comentarios);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req, res, next) {
    try {
      const resultado = await ComentariosService.eliminar(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ComentariosController;
