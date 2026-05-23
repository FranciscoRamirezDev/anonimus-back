const { Usuario } = require('../../models');

class UsuarioService {
  static async crear(data) {
    const usuario = await Usuario.create(data);
    return usuario;
  }

  static async obtenerTodos(limit = 10, offset = 0) {
    const { count, rows } = await Usuario.findAndCountAll({
      limit,
      offset,
      attributes: { exclude: ['password_hash'] },
    });
    return { total: count, usuarios: rows };
  }

  static async obtenerPorId(id) {
    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ['password_hash'] },
    });
    if (!usuario) throw new Error('Usuario no encontrado');
    return usuario;
  }

  static async obtenerPorAlias(alias) {
    return await Usuario.findOne({ where: { alias } });
  }

  static async actualizar(id, data) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuario no encontrado');
    await usuario.update(data);
    const { password_hash: _, ...sinPassword } = usuario.toJSON();
    return sinPassword;
  }

  static async eliminar(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuario no encontrado');
    await usuario.destroy();
    return { mensaje: 'Usuario eliminado' };
  }
}

module.exports = UsuarioService;
