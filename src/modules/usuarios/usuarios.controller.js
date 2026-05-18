const UsuariosService = require('./usuarios.service');

class UsuariosController {
  static async crear(req, res, next) {
    try {
      const usuarios = await UsuariosService.crear(req.body);
      res.status(201).json(usuarios);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerTodos(req, res, next) {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 10, 100);
      const offset = Math.max(parseInt(req.query.offset) || 0, 0);
      const resultado = await UsuariosService.obtenerTodos(limit, offset);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerPorId(req, res, next) {
    try {
      const usuarios = await UsuariosService.obtenerPorId(req.params.id);
      res.json(usuarios);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    try {
      const usuarios = await UsuariosService.actualizar(req.params.id, req.body);
      res.json(usuarios);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req, res, next) {
    try {
      const resultado = await UsuariosService.eliminar(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsuariosController;
