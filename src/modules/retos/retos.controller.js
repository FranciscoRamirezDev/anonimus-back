const RetosService = require('./retos.service');

class RetosController {
  static async crear(req, res, next) {
    try {
      // Agregar id_usuario del token JWT al body
      const data = {
        ...req.body,
        id_usuario: req.user.id_usuario,
      };
      const retos = await RetosService.crear(data);
      res.status(201).json(retos);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerTodos(req, res, next) {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 10, 100);
      const offset = Math.max(parseInt(req.query.offset) || 0, 0);
      const resultado = await RetosService.obtenerTodos(limit, offset);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerPorId(req, res, next) {
    try {
      const retos = await RetosService.obtenerPorId(req.params.id);
      res.json(retos);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    try {
      const retos = await RetosService.actualizar(req.params.id, req.body);
      res.json(retos);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req, res, next) {
    try {
      const resultado = await RetosService.eliminar(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RetosController;
