jest.mock('../../../../src/models', () => ({
  Publicacion: {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

const { Publicacion } = require('../../../../src/models');
const PublicacionService = require('../../../../src/modules/publicaciones/publicaciones.service');

describe('Publicacion Service', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('crear', () => {
    it('debería crear una publicación', async () => {
      const data = { id_usuario: 1, id_comunidad: 1, contenido: 'Test post' };
      Publicacion.create.mockResolvedValue({ id_publicacion: 1, ...data });

      const result = await PublicacionService.crear(data);

      expect(result.contenido).toBe('Test post');
      expect(Publicacion.create).toHaveBeenCalledWith(data);
    });
  });

  describe('obtenerTodos', () => {
    it('debería retornar publicaciones paginadas', async () => {
      Publicacion.findAndCountAll.mockResolvedValue({
        count: 2,
        rows: [{ id_publicacion: 1 }, { id_publicacion: 2 }],
      });

      const result = await PublicacionService.obtenerTodos(10, 0);

      expect(result.total).toBe(2);
      expect(result.publicaciones).toHaveLength(2);
    });

    it('debería usar valores por defecto', async () => {
      Publicacion.findAndCountAll.mockResolvedValue({ count: 0, rows: [] });

      await PublicacionService.obtenerTodos();

      expect(Publicacion.findAndCountAll).toHaveBeenCalledWith({ limit: 10, offset: 0 });
    });
  });

  describe('obtenerPorId', () => {
    it('debería retornar una publicación', async () => {
      Publicacion.findByPk.mockResolvedValue({ id_publicacion: 1, contenido: 'Test' });

      const result = await PublicacionService.obtenerPorId(1);

      expect(result.contenido).toBe('Test');
    });

    it('debería lanzar error si no existe', async () => {
      Publicacion.findByPk.mockResolvedValue(null);

      await expect(PublicacionService.obtenerPorId(999))
        .rejects.toThrow('Publicacion no encontrado');
    });
  });

  describe('actualizar', () => {
    it('debería actualizar una publicación', async () => {
      const mock = { update: jest.fn().mockResolvedValue({ contenido: 'Updated' }) };
      Publicacion.findByPk.mockResolvedValue(mock);

      await PublicacionService.actualizar(1, { contenido: 'Updated' });

      expect(mock.update).toHaveBeenCalledWith({ contenido: 'Updated' });
    });

    it('debería lanzar error si no existe', async () => {
      Publicacion.findByPk.mockResolvedValue(null);

      await expect(PublicacionService.actualizar(999, {}))
        .rejects.toThrow('Publicacion no encontrado');
    });
  });

  describe('eliminar', () => {
    it('debería eliminar una publicación', async () => {
      Publicacion.findByPk.mockResolvedValue({ destroy: jest.fn() });

      const result = await PublicacionService.eliminar(1);

      expect(result.mensaje).toBe('Publicacion eliminado');
    });

    it('debería lanzar error si no existe', async () => {
      Publicacion.findByPk.mockResolvedValue(null);

      await expect(PublicacionService.eliminar(999))
        .rejects.toThrow('Publicacion no encontrado');
    });
  });
});
