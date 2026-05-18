const UsuarioService = require('./usuarios.service');

class UsuarioController {
  static async crear(req, res, next) {
    try {
      const usuario = await UsuarioService.crear(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerTodos(req, res, next) {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const resultado = await UsuarioService.obtenerTodos(limit, offset);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerPorId(req, res, next) {
    try {
      const usuario = await UsuarioService.obtenerPorId(req.params.id);
      res.json(usuario);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    try {
      const usuario = await UsuarioService.actualizar(req.params.id, req.body);
      res.json(usuario);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req, res, next) {
    try {
      const resultado = await UsuarioService.eliminar(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsuarioController;
