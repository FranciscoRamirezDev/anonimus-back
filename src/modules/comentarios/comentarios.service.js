const { Comentario } = require('../../models');

class ComentarioService {
  static async crear(data) {
    return await Comentario.create(data);
  }

  static async obtenerTodos(limit = 10, offset = 0) {
    const { count, rows } = await Comentario.findAndCountAll({
      limit,
      offset,
    });
    return { total: count, comentarios: rows };
  }

  static async obtenerPorId(id) {
    const comentario = await Comentario.findByPk(id);
    if (!comentario) throw new Error('Comentario no encontrado');
    return comentario;
  }

  static async actualizar(id, data) {
    const comentario = await Comentario.findByPk(id);
    if (!comentario) throw new Error('Comentario no encontrado');
    return await comentario.update(data);
  }

  static async eliminar(id) {
    const comentario = await Comentario.findByPk(id);
    if (!comentario) throw new Error('Comentario no encontrado');
    await comentario.destroy();
    return { mensaje: 'Comentario eliminado' };
  }
}

module.exports = ComentarioService;
