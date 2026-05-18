const { Administrador } = require('../../models');

class AdministradorService {
  static async crear(data) {
    return await Administrador.create(data);
  }

  static async obtenerTodos(limit = 10, offset = 0) {
    const { count, rows } = await Administrador.findAndCountAll({
      limit,
      offset,
    });
    return { total: count, administradores: rows };
  }

  static async obtenerPorId(id) {
    const administrador = await Administrador.findByPk(id);
    if (!administrador) throw new Error('Administrador no encontrado');
    return administrador;
  }

  static async actualizar(id, data) {
    const administrador = await Administrador.findByPk(id);
    if (!administrador) throw new Error('Administrador no encontrado');
    return await administrador.update(data);
  }

  static async eliminar(id) {
    const administrador = await Administrador.findByPk(id);
    if (!administrador) throw new Error('Administrador no encontrado');
    await administrador.destroy();
    return { mensaje: 'Administrador eliminado' };
  }
}

module.exports = AdministradorService;
