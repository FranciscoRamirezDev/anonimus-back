jest.mock('../../../../src/models', () => ({
  Comunidad: {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

const { Comunidad } = require('../../../../src/models');
const ComunidadService = require('../../../../src/modules/comunidades/comunidades.service');

describe('Comunidad Service', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('crear', () => {
    it('debería crear una comunidad', async () => {
      const data = { nombre: 'Tech', categoria: 'Tecnología' };
      Comunidad.create.mockResolvedValue({ id_comunidad: 1, ...data });

      const result = await ComunidadService.crear(data);

      expect(result.nombre).toBe('Tech');
      expect(Comunidad.create).toHaveBeenCalledWith(data);
    });
  });

  describe('obtenerTodos', () => {
    it('debería retornar comunidades paginadas', async () => {
      Comunidad.findAndCountAll.mockResolvedValue({
        count: 1,
        rows: [{ id_comunidad: 1, nombre: 'Tech' }],
      });

      const result = await ComunidadService.obtenerTodos(10, 0);

      expect(result.total).toBe(1);
      expect(result.comunidades).toHaveLength(1);
    });

    it('debería usar valores por defecto', async () => {
      Comunidad.findAndCountAll.mockResolvedValue({ count: 0, rows: [] });

      await ComunidadService.obtenerTodos();

      expect(Comunidad.findAndCountAll).toHaveBeenCalledWith({ limit: 10, offset: 0 });
    });
  });

  describe('obtenerPorId', () => {
    it('debería retornar una comunidad', async () => {
      Comunidad.findByPk.mockResolvedValue({ id_comunidad: 1, nombre: 'Tech' });

      const result = await ComunidadService.obtenerPorId(1);

      expect(result.nombre).toBe('Tech');
    });

    it('debería lanzar error si no existe', async () => {
      Comunidad.findByPk.mockResolvedValue(null);

      await expect(ComunidadService.obtenerPorId(999))
        .rejects.toThrow('Comunidad no encontrado');
    });
  });

  describe('actualizar', () => {
    it('debería actualizar una comunidad', async () => {
      const mockComunidad = {
        update: jest.fn().mockResolvedValue({ id_comunidad: 1, nombre: 'Updated' }),
      };
      Comunidad.findByPk.mockResolvedValue(mockComunidad);

      await ComunidadService.actualizar(1, { nombre: 'Updated' });

      expect(mockComunidad.update).toHaveBeenCalledWith({ nombre: 'Updated' });
    });

    it('debería lanzar error si no existe', async () => {
      Comunidad.findByPk.mockResolvedValue(null);

      await expect(ComunidadService.actualizar(999, {}))
        .rejects.toThrow('Comunidad no encontrado');
    });
  });

  describe('eliminar', () => {
    it('debería eliminar una comunidad', async () => {
      Comunidad.findByPk.mockResolvedValue({ destroy: jest.fn() });

      const result = await ComunidadService.eliminar(1);

      expect(result.mensaje).toBe('Comunidad eliminado');
    });

    it('debería lanzar error si no existe', async () => {
      Comunidad.findByPk.mockResolvedValue(null);

      await expect(ComunidadService.eliminar(999))
        .rejects.toThrow('Comunidad no encontrado');
    });
  });
});
