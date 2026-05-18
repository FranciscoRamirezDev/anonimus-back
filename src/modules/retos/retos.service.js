const { Reto } = require('../../models');

class RetoService {
  static async crear(data) {
    return await Reto.create(data);
  }

  static async obtenerTodos(limit = 10, offset = 0) {
    const { count, rows } = await Reto.findAndCountAll({
      limit,
      offset,
    });
    return { total: count, retos: rows };
  }

  static async obtenerPorId(id) {
    const reto = await Reto.findByPk(id);
    if (!reto) throw new Error('Reto no encontrado');
    return reto;
  }

  static async actualizar(id, data) {
    const reto = await Reto.findByPk(id);
    if (!reto) throw new Error('Reto no encontrado');
    return await reto.update(data);
  }

  static async eliminar(id) {
    const reto = await Reto.findByPk(id);
    if (!reto) throw new Error('Reto no encontrado');
    await reto.destroy();
    return { mensaje: 'Reto eliminado' };
  }
}

module.exports = RetoService;
