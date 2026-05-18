const { Reporte } = require('../../models');

class ReporteService {
  static async crear(data) {
    return await Reporte.create(data);
  }

  static async obtenerTodos(limit = 10, offset = 0) {
    const { count, rows } = await Reporte.findAndCountAll({
      limit,
      offset,
    });
    return { total: count, reportes: rows };
  }

  static async obtenerPorId(id) {
    const reporte = await Reporte.findByPk(id);
    if (!reporte) throw new Error('Reporte no encontrado');
    return reporte;
  }

  static async actualizar(id, data) {
    const reporte = await Reporte.findByPk(id);
    if (!reporte) throw new Error('Reporte no encontrado');
    return await reporte.update(data);
  }

  static async eliminar(id) {
    const reporte = await Reporte.findByPk(id);
    if (!reporte) throw new Error('Reporte no encontrado');
    await reporte.destroy();
    return { mensaje: 'Reporte eliminado' };
  }
}

module.exports = ReporteService;
