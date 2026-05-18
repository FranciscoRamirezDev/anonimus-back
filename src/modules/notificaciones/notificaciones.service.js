const { Notificacion } = require('../../models');

class NotificacionService {
  static async crear(data) {
    return await Notificacion.create(data);
  }

  static async obtenerTodos(limit = 10, offset = 0) {
    const { count, rows } = await Notificacion.findAndCountAll({
      limit,
      offset,
    });
    return { total: count, notificaciones: rows };
  }

  static async obtenerPorId(id) {
    const notificacion = await Notificacion.findByPk(id);
    if (!notificacion) throw new Error('Notificacion no encontrado');
    return notificacion;
  }

  static async actualizar(id, data) {
    const notificacion = await Notificacion.findByPk(id);
    if (!notificacion) throw new Error('Notificacion no encontrado');
    return await notificacion.update(data);
  }

  static async eliminar(id) {
    const notificacion = await Notificacion.findByPk(id);
    if (!notificacion) throw new Error('Notificacion no encontrado');
    await notificacion.destroy();
    return { mensaje: 'Notificacion eliminado' };
  }
}

module.exports = NotificacionService;
