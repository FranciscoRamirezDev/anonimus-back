const { Comunidad } = require('../../models');

class ComunidadService {
  static async crear(data) {
    return await Comunidad.create(data);
  }

  static async obtenerTodos(limit = 10, offset = 0) {
    const { count, rows } = await Comunidad.findAndCountAll({
      limit,
      offset,
    });
    return { total: count, comunidades: rows };
  }

  static async obtenerPorId(id) {
    const comunidad = await Comunidad.findByPk(id);
    if (!comunidad) throw new Error('Comunidad no encontrado');
    return comunidad;
  }

  static async actualizar(id, data) {
    const comunidad = await Comunidad.findByPk(id);
    if (!comunidad) throw new Error('Comunidad no encontrado');
    return await comunidad.update(data);
  }

  static async eliminar(id) {
    const comunidad = await Comunidad.findByPk(id);
    if (!comunidad) throw new Error('Comunidad no encontrado');
    await comunidad.destroy();
    return { mensaje: 'Comunidad eliminado' };
  }
}

module.exports = ComunidadService;
