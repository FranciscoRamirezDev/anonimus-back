jest.mock('../../../../src/models', () => ({
  Administrador: {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

const { Administrador } = require('../../../../src/models');
const AdministradorService = require('../../../../src/modules/administradores/administradores.service');

describe('Administrador Service', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('crear', () => {
    it('debería crear un administrador', async () => {
      const data = { credenciales: 'admin_cred' };
      Administrador.create.mockResolvedValue({ id_admin: 1, ...data });

      const result = await AdministradorService.crear(data);

      expect(result.credenciales).toBe('admin_cred');
    });
  });

  describe('obtenerTodos', () => {
    it('debería retornar administradores paginados', async () => {
      Administrador.findAndCountAll.mockResolvedValue({ count: 1, rows: [{ id_admin: 1 }] });

      const result = await AdministradorService.obtenerTodos(10, 0);

      expect(result.total).toBe(1);
      expect(result.administradores).toHaveLength(1);
    });

    it('debería usar valores por defecto', async () => {
      Administrador.findAndCountAll.mockResolvedValue({ count: 0, rows: [] });

      await AdministradorService.obtenerTodos();

      expect(Administrador.findAndCountAll).toHaveBeenCalledWith({ limit: 10, offset: 0 });
    });
  });

  describe('obtenerPorId', () => {
    it('debería retornar un administrador', async () => {
      Administrador.findByPk.mockResolvedValue({ id_admin: 1 });

      const result = await AdministradorService.obtenerPorId(1);

      expect(result.id_admin).toBe(1);
    });

    it('debería lanzar error si no existe', async () => {
      Administrador.findByPk.mockResolvedValue(null);

      await expect(AdministradorService.obtenerPorId(999))
        .rejects.toThrow('Administrador no encontrado');
    });
  });

  describe('actualizar', () => {
    it('debería actualizar un administrador', async () => {
      const mock = { update: jest.fn().mockResolvedValue({ credenciales: 'updated' }) };
      Administrador.findByPk.mockResolvedValue(mock);

      await AdministradorService.actualizar(1, { credenciales: 'updated' });

      expect(mock.update).toHaveBeenCalledWith({ credenciales: 'updated' });
    });

    it('debería lanzar error si no existe', async () => {
      Administrador.findByPk.mockResolvedValue(null);

      await expect(AdministradorService.actualizar(999, {}))
        .rejects.toThrow('Administrador no encontrado');
    });
  });

  describe('eliminar', () => {
    it('debería eliminar un administrador', async () => {
      Administrador.findByPk.mockResolvedValue({ destroy: jest.fn() });

      const result = await AdministradorService.eliminar(1);

      expect(result.mensaje).toBe('Administrador eliminado');
    });

    it('debería lanzar error si no existe', async () => {
      Administrador.findByPk.mockResolvedValue(null);

      await expect(AdministradorService.eliminar(999))
        .rejects.toThrow('Administrador no encontrado');
    });
  });
});
