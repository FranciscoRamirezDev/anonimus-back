const AdministradoresService = require('./administradores.service');

class AdministradoresController {
  static async crear(req, res, next) {
    try {
      const administradores = await AdministradoresService.crear(req.body);
      res.status(201).json(administradores);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerTodos(req, res, next) {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 10, 100);
      const offset = Math.max(parseInt(req.query.offset) || 0, 0);
      const resultado = await AdministradoresService.obtenerTodos(limit, offset);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerPorId(req, res, next) {
    try {
      const administradores = await AdministradoresService.obtenerPorId(req.params.id);
      res.json(administradores);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    try {
      const administradores = await AdministradoresService.actualizar(req.params.id, req.body);
      res.json(administradores);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req, res, next) {
    try {
      const resultado = await AdministradoresService.eliminar(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdministradoresController;
