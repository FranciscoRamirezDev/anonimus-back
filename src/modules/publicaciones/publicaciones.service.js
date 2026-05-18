const { Publicacion } = require('../../models');

class PublicacionService {
  static async crear(data) {
    return await Publicacion.create(data);
  }

  static async obtenerTodos(limit = 10, offset = 0) {
    const { count, rows } = await Publicacion.findAndCountAll({
      limit,
      offset,
    });
    return { total: count, publicaciones: rows };
  }

  static async obtenerPorId(id) {
    const publicacion = await Publicacion.findByPk(id);
    if (!publicacion) throw new Error('Publicacion no encontrado');
    return publicacion;
  }

  static async actualizar(id, data) {
    const publicacion = await Publicacion.findByPk(id);
    if (!publicacion) throw new Error('Publicacion no encontrado');
    return await publicacion.update(data);
  }

  static async eliminar(id) {
    const publicacion = await Publicacion.findByPk(id);
    if (!publicacion) throw new Error('Publicacion no encontrado');
    await publicacion.destroy();
    return { mensaje: 'Publicacion eliminado' };
  }
}

module.exports = PublicacionService;
