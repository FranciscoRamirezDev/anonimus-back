const AdministradorService = require('./administradores.service');

class AdministradorController {
  static async crear(req, res, next) {
    try {
      const administrador = await AdministradorService.crear(req.body);
      res.status(201).json(administrador);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerTodos(req, res, next) {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const resultado = await AdministradorService.obtenerTodos(limit, offset);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerPorId(req, res, next) {
    try {
      const administrador = await AdministradorService.obtenerPorId(req.params.id);
      res.json(administrador);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    try {
      const administrador = await AdministradorService.actualizar(req.params.id, req.body);
      res.json(administrador);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req, res, next) {
    try {
      const resultado = await AdministradorService.eliminar(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdministradorController;
