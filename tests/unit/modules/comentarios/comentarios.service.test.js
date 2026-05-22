jest.mock('../../../../src/models', () => ({
  Comentario: {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

const { Comentario } = require('../../../../src/models');
const ComentarioService = require('../../../../src/modules/comentarios/comentarios.service');

describe('Comentario Service', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('crear', () => {
    it('debería crear un comentario', async () => {
      const data = { id_publicacion: 1, id_usuario: 1, texto: 'Comentario test' };
      Comentario.create.mockResolvedValue({ id_comentario: 1, ...data });

      const result = await ComentarioService.crear(data);

      expect(result.texto).toBe('Comentario test');
    });
  });

  describe('obtenerTodos', () => {
    it('debería retornar comentarios paginados', async () => {
      Comentario.findAndCountAll.mockResolvedValue({ count: 1, rows: [{ id_comentario: 1 }] });

      const result = await ComentarioService.obtenerTodos(10, 0);

      expect(result.total).toBe(1);
      expect(result.comentarios).toHaveLength(1);
    });

    it('debería usar valores por defecto', async () => {
      Comentario.findAndCountAll.mockResolvedValue({ count: 0, rows: [] });

      await ComentarioService.obtenerTodos();

      expect(Comentario.findAndCountAll).toHaveBeenCalledWith({ limit: 10, offset: 0 });
    });
  });

  describe('obtenerPorId', () => {
    it('debería retornar un comentario', async () => {
      Comentario.findByPk.mockResolvedValue({ id_comentario: 1, texto: 'Test' });

      const result = await ComentarioService.obtenerPorId(1);

      expect(result.texto).toBe('Test');
    });

    it('debería lanzar error si no existe', async () => {
      Comentario.findByPk.mockResolvedValue(null);

      await expect(ComentarioService.obtenerPorId(999))
        .rejects.toThrow('Comentario no encontrado');
    });
  });

  describe('actualizar', () => {
    it('debería actualizar un comentario', async () => {
      const mock = { update: jest.fn().mockResolvedValue({ texto: 'Updated' }) };
      Comentario.findByPk.mockResolvedValue(mock);

      await ComentarioService.actualizar(1, { texto: 'Updated' });

      expect(mock.update).toHaveBeenCalledWith({ texto: 'Updated' });
    });

    it('debería lanzar error si no existe', async () => {
      Comentario.findByPk.mockResolvedValue(null);

      await expect(ComentarioService.actualizar(999, {}))
        .rejects.toThrow('Comentario no encontrado');
    });
  });

  describe('eliminar', () => {
    it('debería eliminar un comentario', async () => {
      Comentario.findByPk.mockResolvedValue({ destroy: jest.fn() });

      const result = await ComentarioService.eliminar(1);

      expect(result.mensaje).toBe('Comentario eliminado');
    });

    it('debería lanzar error si no existe', async () => {
      Comentario.findByPk.mockResolvedValue(null);

      await expect(ComentarioService.eliminar(999))
        .rejects.toThrow('Comentario no encontrado');
    });
  });
});
