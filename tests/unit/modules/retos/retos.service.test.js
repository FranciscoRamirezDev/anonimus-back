jest.mock('../../../../src/models', () => ({
  Reto: {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

const { Reto } = require('../../../../src/models');
const RetoService = require('../../../../src/modules/retos/retos.service');

describe('Reto Service', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('crear', () => {
    it('debería crear un reto', async () => {
      const data = { id_usuario: 1, titulo: 'Reto test', progreso_pct: 0 };
      Reto.create.mockResolvedValue({ id_reto: 1, ...data });

      const result = await RetoService.crear(data);

      expect(result.titulo).toBe('Reto test');
    });
  });

  describe('obtenerTodos', () => {
    it('debería retornar retos paginados', async () => {
      Reto.findAndCountAll.mockResolvedValue({ count: 1, rows: [{ id_reto: 1 }] });

      const result = await RetoService.obtenerTodos(10, 0);

      expect(result.total).toBe(1);
      expect(result.retos).toHaveLength(1);
    });

    it('debería usar valores por defecto', async () => {
      Reto.findAndCountAll.mockResolvedValue({ count: 0, rows: [] });

      await RetoService.obtenerTodos();

      expect(Reto.findAndCountAll).toHaveBeenCalledWith({ limit: 10, offset: 0 });
    });
  });

  describe('obtenerPorId', () => {
    it('debería retornar un reto', async () => {
      Reto.findByPk.mockResolvedValue({ id_reto: 1, titulo: 'Reto' });

      const result = await RetoService.obtenerPorId(1);

      expect(result.titulo).toBe('Reto');
    });

    it('debería lanzar error si no existe', async () => {
      Reto.findByPk.mockResolvedValue(null);

      await expect(RetoService.obtenerPorId(999))
        .rejects.toThrow('Reto no encontrado');
    });
  });

  describe('actualizar', () => {
    it('debería actualizar un reto', async () => {
      const mock = { update: jest.fn().mockResolvedValue({ progreso_pct: 50 }) };
      Reto.findByPk.mockResolvedValue(mock);

      await RetoService.actualizar(1, { progreso_pct: 50 });

      expect(mock.update).toHaveBeenCalledWith({ progreso_pct: 50 });
    });

    it('debería lanzar error si no existe', async () => {
      Reto.findByPk.mockResolvedValue(null);

      await expect(RetoService.actualizar(999, {}))
        .rejects.toThrow('Reto no encontrado');
    });
  });

  describe('eliminar', () => {
    it('debería eliminar un reto', async () => {
      Reto.findByPk.mockResolvedValue({ destroy: jest.fn() });

      const result = await RetoService.eliminar(1);

      expect(result.mensaje).toBe('Reto eliminado');
    });

    it('debería lanzar error si no existe', async () => {
      Reto.findByPk.mockResolvedValue(null);

      await expect(RetoService.eliminar(999))
        .rejects.toThrow('Reto no encontrado');
    });
  });
});
