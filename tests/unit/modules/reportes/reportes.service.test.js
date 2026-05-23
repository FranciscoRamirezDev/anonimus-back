jest.mock('../../../../src/models', () => ({
  Reporte: {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

const { Reporte } = require('../../../../src/models');
const ReporteService = require('../../../../src/modules/reportes/reportes.service');

describe('Reporte Service', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('crear', () => {
    it('debería crear un reporte', async () => {
      const data = { id_publicacion: 1, id_admin: 1, estado: 'pendiente' };
      Reporte.create.mockResolvedValue({ id_reporte: 1, ...data });

      const result = await ReporteService.crear(data);

      expect(result.estado).toBe('pendiente');
    });
  });

  describe('obtenerTodos', () => {
    it('debería retornar reportes paginados', async () => {
      Reporte.findAndCountAll.mockResolvedValue({ count: 1, rows: [{ id_reporte: 1 }] });

      const result = await ReporteService.obtenerTodos(10, 0);

      expect(result.total).toBe(1);
      expect(result.reportes).toHaveLength(1);
    });

    it('debería usar valores por defecto', async () => {
      Reporte.findAndCountAll.mockResolvedValue({ count: 0, rows: [] });

      await ReporteService.obtenerTodos();

      expect(Reporte.findAndCountAll).toHaveBeenCalledWith({ limit: 10, offset: 0 });
    });
  });

  describe('obtenerPorId', () => {
    it('debería retornar un reporte', async () => {
      Reporte.findByPk.mockResolvedValue({ id_reporte: 1, estado: 'pendiente' });

      const result = await ReporteService.obtenerPorId(1);

      expect(result.estado).toBe('pendiente');
    });

    it('debería lanzar error si no existe', async () => {
      Reporte.findByPk.mockResolvedValue(null);

      await expect(ReporteService.obtenerPorId(999))
        .rejects.toThrow('Reporte no encontrado');
    });
  });

  describe('actualizar', () => {
    it('debería actualizar un reporte', async () => {
      const mock = { update: jest.fn().mockResolvedValue({ estado: 'revisado' }) };
      Reporte.findByPk.mockResolvedValue(mock);

      await ReporteService.actualizar(1, { estado: 'revisado' });

      expect(mock.update).toHaveBeenCalledWith({ estado: 'revisado' });
    });

    it('debería lanzar error si no existe', async () => {
      Reporte.findByPk.mockResolvedValue(null);

      await expect(ReporteService.actualizar(999, {}))
        .rejects.toThrow('Reporte no encontrado');
    });
  });

  describe('eliminar', () => {
    it('debería eliminar un reporte', async () => {
      Reporte.findByPk.mockResolvedValue({ destroy: jest.fn() });

      const result = await ReporteService.eliminar(1);

      expect(result.mensaje).toBe('Reporte eliminado');
    });

    it('debería lanzar error si no existe', async () => {
      Reporte.findByPk.mockResolvedValue(null);

      await expect(ReporteService.eliminar(999))
        .rejects.toThrow('Reporte no encontrado');
    });
  });
});
