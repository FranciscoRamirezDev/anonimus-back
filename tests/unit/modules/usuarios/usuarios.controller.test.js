const UsuariosController = require('../../../../src/modules/usuarios/usuarios.controller');
const UsuariosService = require('../../../../src/modules/usuarios/usuarios.service');

jest.mock('../../../../src/modules/usuarios/usuarios.service');

describe('Usuarios Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, params: {}, query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  describe('crear', () => {
    it('debería retornar 201 al crear usuario', async () => {
      const mockUser = { id_usuario: 1, alias: 'nuevo' };
      req.body = { alias: 'nuevo', password_hash: 'pass' };
      UsuariosService.crear.mockResolvedValue(mockUser);

      await UsuariosController.crear(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('debería llamar next con error', async () => {
      UsuariosService.crear.mockRejectedValue(new Error('fail'));

      await UsuariosController.crear(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('obtenerTodos', () => {
    it('debería retornar lista paginada', async () => {
      const mockResult = { total: 1, usuarios: [{ id_usuario: 1 }] };
      req.query = { limit: '5', offset: '0' };
      UsuariosService.obtenerTodos.mockResolvedValue(mockResult);

      await UsuariosController.obtenerTodos(req, res, next);

      expect(UsuariosService.obtenerTodos).toHaveBeenCalledWith(5, 0);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('debería limitar el máximo a 100', async () => {
      req.query = { limit: '500' };
      UsuariosService.obtenerTodos.mockResolvedValue({ total: 0, usuarios: [] });

      await UsuariosController.obtenerTodos(req, res, next);

      expect(UsuariosService.obtenerTodos).toHaveBeenCalledWith(100, 0);
    });

    it('debería usar defaults si no hay query params', async () => {
      UsuariosService.obtenerTodos.mockResolvedValue({ total: 0, usuarios: [] });

      await UsuariosController.obtenerTodos(req, res, next);

      expect(UsuariosService.obtenerTodos).toHaveBeenCalledWith(10, 0);
    });

    it('debería forzar offset mínimo a 0', async () => {
      req.query = { offset: '-5' };
      UsuariosService.obtenerTodos.mockResolvedValue({ total: 0, usuarios: [] });

      await UsuariosController.obtenerTodos(req, res, next);

      expect(UsuariosService.obtenerTodos).toHaveBeenCalledWith(10, 0);
    });
  });

  describe('obtenerPorId', () => {
    it('debería retornar un usuario', async () => {
      req.params.id = '1';
      UsuariosService.obtenerPorId.mockResolvedValue({ id_usuario: 1 });

      await UsuariosController.obtenerPorId(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ id_usuario: 1 });
    });

    it('debería llamar next si no existe', async () => {
      req.params.id = '999';
      UsuariosService.obtenerPorId.mockRejectedValue(new Error('Usuario no encontrado'));

      await UsuariosController.obtenerPorId(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('actualizar', () => {
    it('debería actualizar y retornar el usuario', async () => {
      req.params.id = '1';
      req.body = { alias: 'updated' };
      UsuariosService.actualizar.mockResolvedValue({ id_usuario: 1, alias: 'updated' });

      await UsuariosController.actualizar(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ id_usuario: 1, alias: 'updated' });
    });
  });

  describe('eliminar', () => {
    it('debería eliminar y retornar confirmación', async () => {
      req.params.id = '1';
      UsuariosService.eliminar.mockResolvedValue({ mensaje: 'Usuario eliminado' });

      await UsuariosController.eliminar(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Usuario eliminado' });
    });
  });
});
