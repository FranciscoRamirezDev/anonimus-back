jest.mock('../../../../src/models', () => ({
  Reaccion: {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

const { Reaccion } = require('../../../../src/models');
const ReaccionService = require('../../../../src/modules/reacciones/reacciones.service');

describe('Reaccion Service', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('crear', () => {
    it('debería crear una reacción', async () => {
      const data = { id_publicacion: 1, tipo_reaccion: 'like' };
      Reaccion.create.mockResolvedValue({ id_reaccion: 1, ...data });

      const result = await ReaccionService.crear(data);

      expect(result.tipo_reaccion).toBe('like');
    });
  });

  describe('obtenerTodos', () => {
    it('debería retornar reacciones paginadas', async () => {
      Reaccion.findAndCountAll.mockResolvedValue({ count: 3, rows: [{}, {}, {}] });

      const result = await ReaccionService.obtenerTodos(10, 0);

      expect(result.total).toBe(3);
      expect(result.reacciones).toHaveLength(3);
    });

    it('debería usar valores por defecto', async () => {
      Reaccion.findAndCountAll.mockResolvedValue({ count: 0, rows: [] });

      await ReaccionService.obtenerTodos();

      expect(Reaccion.findAndCountAll).toHaveBeenCalledWith({ limit: 10, offset: 0 });
    });
  });

  describe('obtenerPorId', () => {
    it('debería retornar una reacción', async () => {
      Reaccion.findByPk.mockResolvedValue({ id_reaccion: 1, tipo_reaccion: 'love' });

      const result = await ReaccionService.obtenerPorId(1);

      expect(result.tipo_reaccion).toBe('love');
    });

    it('debería lanzar error si no existe', async () => {
      Reaccion.findByPk.mockResolvedValue(null);

      await expect(ReaccionService.obtenerPorId(999))
        .rejects.toThrow('Reaccion no encontrado');
    });
  });

  describe('actualizar', () => {
    it('debería actualizar una reacción', async () => {
      const mock = { update: jest.fn().mockResolvedValue({ tipo_reaccion: 'haha' }) };
      Reaccion.findByPk.mockResolvedValue(mock);

      await ReaccionService.actualizar(1, { tipo_reaccion: 'haha' });

      expect(mock.update).toHaveBeenCalledWith({ tipo_reaccion: 'haha' });
    });

    it('debería lanzar error si no existe', async () => {
      Reaccion.findByPk.mockResolvedValue(null);

      await expect(ReaccionService.actualizar(999, {}))
        .rejects.toThrow('Reaccion no encontrado');
    });
  });

  describe('eliminar', () => {
    it('debería eliminar una reacción', async () => {
      Reaccion.findByPk.mockResolvedValue({ destroy: jest.fn() });

      const result = await ReaccionService.eliminar(1);

      expect(result.mensaje).toBe('Reaccion eliminado');
    });

    it('debería lanzar error si no existe', async () => {
      Reaccion.findByPk.mockResolvedValue(null);

      await expect(ReaccionService.eliminar(999))
        .rejects.toThrow('Reaccion no encontrado');
    });
  });
});
