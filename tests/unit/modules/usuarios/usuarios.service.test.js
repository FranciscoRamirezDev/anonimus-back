jest.mock('../../../../src/models', () => ({
  Usuario: {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
  },
}));

const { Usuario } = require('../../../../src/models');
const UsuarioService = require('../../../../src/modules/usuarios/usuarios.service');

describe('Usuario Service', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('crear', () => {
    it('debería crear un usuario', async () => {
      const data = { alias: 'nuevo', password_hash: 'hashed' };
      Usuario.create.mockResolvedValue({ id_usuario: 1, ...data });

      const result = await UsuarioService.crear(data);

      expect(Usuario.create).toHaveBeenCalledWith(data);
      expect(result.alias).toBe('nuevo');
    });
  });

  describe('obtenerTodos', () => {
    it('debería retornar usuarios paginados', async () => {
      Usuario.findAndCountAll.mockResolvedValue({
        count: 2,
        rows: [{ id_usuario: 1 }, { id_usuario: 2 }],
      });

      const result = await UsuarioService.obtenerTodos(10, 0);

      expect(result.total).toBe(2);
      expect(result.usuarios).toHaveLength(2);
      expect(Usuario.findAndCountAll).toHaveBeenCalledWith({
        limit: 10,
        offset: 0,
        attributes: { exclude: ['password_hash'] },
      });
    });

    it('debería usar valores por defecto para limit y offset', async () => {
      Usuario.findAndCountAll.mockResolvedValue({ count: 0, rows: [] });

      await UsuarioService.obtenerTodos();

      expect(Usuario.findAndCountAll).toHaveBeenCalledWith({
        limit: 10,
        offset: 0,
        attributes: { exclude: ['password_hash'] },
      });
    });
  });

  describe('obtenerPorId', () => {
    it('debería retornar un usuario por ID', async () => {
      Usuario.findByPk.mockResolvedValue({ id_usuario: 1, alias: 'test' });

      const result = await UsuarioService.obtenerPorId(1);

      expect(result.alias).toBe('test');
      expect(Usuario.findByPk).toHaveBeenCalledWith(1, {
        attributes: { exclude: ['password_hash'] },
      });
    });

    it('debería lanzar error si el usuario no existe', async () => {
      Usuario.findByPk.mockResolvedValue(null);

      await expect(UsuarioService.obtenerPorId(999))
        .rejects.toThrow('Usuario no encontrado');
    });
  });

  describe('obtenerPorAlias', () => {
    it('debería buscar un usuario por alias', async () => {
      Usuario.findOne.mockResolvedValue({ id_usuario: 1, alias: 'test' });

      const result = await UsuarioService.obtenerPorAlias('test');

      expect(Usuario.findOne).toHaveBeenCalledWith({ where: { alias: 'test' } });
      expect(result.alias).toBe('test');
    });

    it('debería retornar null si no existe', async () => {
      Usuario.findOne.mockResolvedValue(null);

      const result = await UsuarioService.obtenerPorAlias('no_existe');

      expect(result).toBeNull();
    });
  });

  describe('actualizar', () => {
    it('debería actualizar un usuario existente', async () => {
      const mockUsuario = {
        id_usuario: 1,
        alias: 'updated',
        password_hash: 'secret',
        update: jest.fn().mockResolvedValue(true),
        toJSON: () => ({ id_usuario: 1, alias: 'updated', password_hash: 'secret' }),
      };
      Usuario.findByPk.mockResolvedValue(mockUsuario);

      const result = await UsuarioService.actualizar(1, { alias: 'updated' });

      expect(mockUsuario.update).toHaveBeenCalledWith({ alias: 'updated' });
      expect(result.password_hash).toBeUndefined();
    });

    it('debería lanzar error si el usuario no existe', async () => {
      Usuario.findByPk.mockResolvedValue(null);

      await expect(UsuarioService.actualizar(999, { alias: 'x' }))
        .rejects.toThrow('Usuario no encontrado');
    });
  });

  describe('eliminar', () => {
    it('debería eliminar un usuario existente', async () => {
      const mockUsuario = { destroy: jest.fn().mockResolvedValue(true) };
      Usuario.findByPk.mockResolvedValue(mockUsuario);

      const result = await UsuarioService.eliminar(1);

      expect(mockUsuario.destroy).toHaveBeenCalled();
      expect(result.mensaje).toBe('Usuario eliminado');
    });

    it('debería lanzar error si el usuario no existe', async () => {
      Usuario.findByPk.mockResolvedValue(null);

      await expect(UsuarioService.eliminar(999))
        .rejects.toThrow('Usuario no encontrado');
    });
  });
});
