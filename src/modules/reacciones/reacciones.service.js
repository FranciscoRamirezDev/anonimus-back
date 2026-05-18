const { Reaccion } = require('../../models');

class ReaccionService {
  static async crear(data) {
    return await Reaccion.create(data);
  }

  static async obtenerTodos(limit = 10, offset = 0) {
    const { count, rows } = await Reaccion.findAndCountAll({
      limit,
      offset,
    });
    return { total: count, reacciones: rows };
  }

  static async obtenerPorId(id) {
    const reaccion = await Reaccion.findByPk(id);
    if (!reaccion) throw new Error('Reaccion no encontrado');
    return reaccion;
  }

  static async actualizar(id, data) {
    const reaccion = await Reaccion.findByPk(id);
    if (!reaccion) throw new Error('Reaccion no encontrado');
    return await reaccion.update(data);
  }

  static async eliminar(id) {
    const reaccion = await Reaccion.findByPk(id);
    if (!reaccion) throw new Error('Reaccion no encontrado');
    await reaccion.destroy();
    return { mensaje: 'Reaccion eliminado' };
  }
}

module.exports = ReaccionService;
