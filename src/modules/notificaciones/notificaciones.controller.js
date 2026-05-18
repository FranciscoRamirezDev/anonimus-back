const NotificacionService = require('./notificaciones.service');

class NotificacionController {
  static async crear(req, res, next) {
    try {
      const notificacion = await NotificacionService.crear(req.body);
      res.status(201).json(notificacion);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerTodos(req, res, next) {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const resultado = await NotificacionService.obtenerTodos(limit, offset);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerPorId(req, res, next) {
    try {
      const notificacion = await NotificacionService.obtenerPorId(req.params.id);
      res.json(notificacion);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    try {
      const notificacion = await NotificacionService.actualizar(req.params.id, req.body);
      res.json(notificacion);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req, res, next) {
    try {
      const resultado = await NotificacionService.eliminar(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NotificacionController;
