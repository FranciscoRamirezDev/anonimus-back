jest.mock('../../../../src/models', () => ({
  Notificacion: {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

const { Notificacion } = require('../../../../src/models');
const NotificacionService = require('../../../../src/modules/notificaciones/notificaciones.service');

describe('Notificacion Service', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('crear', () => {
    it('debería crear una notificación', async () => {
      const data = { id_usuario: 1, mensaje: 'Nueva notificación' };
      Notificacion.create.mockResolvedValue({ id_notificacion: 1, ...data });

      const result = await NotificacionService.crear(data);

      expect(result.mensaje).toBe('Nueva notificación');
    });
  });

  describe('obtenerTodos', () => {
    it('debería retornar notificaciones paginadas', async () => {
      Notificacion.findAndCountAll.mockResolvedValue({ count: 2, rows: [{}, {}] });

      const result = await NotificacionService.obtenerTodos(10, 0);

      expect(result.total).toBe(2);
      expect(result.notificaciones).toHaveLength(2);
    });

    it('debería usar valores por defecto', async () => {
      Notificacion.findAndCountAll.mockResolvedValue({ count: 0, rows: [] });

      await NotificacionService.obtenerTodos();

      expect(Notificacion.findAndCountAll).toHaveBeenCalledWith({ limit: 10, offset: 0 });
    });
  });

  describe('obtenerPorId', () => {
    it('debería retornar una notificación', async () => {
      Notificacion.findByPk.mockResolvedValue({ id_notificacion: 1, mensaje: 'Test' });

      const result = await NotificacionService.obtenerPorId(1);

      expect(result.mensaje).toBe('Test');
    });

    it('debería lanzar error si no existe', async () => {
      Notificacion.findByPk.mockResolvedValue(null);

      await expect(NotificacionService.obtenerPorId(999))
        .rejects.toThrow('Notificacion no encontrado');
    });
  });

  describe('actualizar', () => {
    it('debería actualizar una notificación', async () => {
      const mock = { update: jest.fn().mockResolvedValue({ mensaje: 'Updated' }) };
      Notificacion.findByPk.mockResolvedValue(mock);

      await NotificacionService.actualizar(1, { mensaje: 'Updated' });

      expect(mock.update).toHaveBeenCalledWith({ mensaje: 'Updated' });
    });

    it('debería lanzar error si no existe', async () => {
      Notificacion.findByPk.mockResolvedValue(null);

      await expect(NotificacionService.actualizar(999, {}))
        .rejects.toThrow('Notificacion no encontrado');
    });
  });

  describe('eliminar', () => {
    it('debería eliminar una notificación', async () => {
      Notificacion.findByPk.mockResolvedValue({ destroy: jest.fn() });

      const result = await NotificacionService.eliminar(1);

      expect(result.mensaje).toBe('Notificacion eliminado');
    });

    it('debería lanzar error si no existe', async () => {
      Notificacion.findByPk.mockResolvedValue(null);

      await expect(NotificacionService.eliminar(999))
        .rejects.toThrow('Notificacion no encontrado');
    });
  });
});
