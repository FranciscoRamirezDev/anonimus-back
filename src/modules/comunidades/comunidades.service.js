const { Comunidad, Publicacion } = require('../../models');

class ComunidadService {
  static async crear(data) {
    return await Comunidad.create(data);
  }

  static async obtenerTodos(limit = 10, offset = 0) {
    const { count, rows } = await Comunidad.findAndCountAll({
      limit,
      offset,
      include: [{ model: Publicacion, attributes: ['id_publicacion'] }],
    });
    return { total: count, comunidades: rows };
  }

  static async obtenerPorId(id) {
    const comunidad = await Comunidad.findByPk(id, {
      include: [{ model: Publicacion }],
    });
    if (!comunidad) throw new Error('Comunidad no encontrada');
    return comunidad;
  }

  static async actualizar(id, data) {
    const comunidad = await Comunidad.findByPk(id);
    if (!comunidad) throw new Error('Comunidad no encontrada');
    return await comunidad.update(data);
  }

  static async eliminar(id) {
    const comunidad = await Comunidad.findByPk(id);
    if (!comunidad) throw new Error('Comunidad no encontrada');
    await comunidad.destroy();
    return { mensaje: 'Comunidad eliminada' };
  }

  static async obtenerPorCategoria(categoria) {
    return await Comunidad.findAll({ where: { categoria } });
  }
}

module.exports = ComunidadService;
