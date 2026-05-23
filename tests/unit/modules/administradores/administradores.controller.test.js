const AdministradoresController = require('../../../../src/modules/administradores/administradores.controller');
const AdministradoresService = require('../../../../src/modules/administradores/administradores.service');

jest.mock('../../../../src/modules/administradores/administradores.service');

describe('Administradores Controller', () => {
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
    it('debería retornar 201 al crear administrador', async () => {
      req.body = { credenciales: 'admin' };
      AdministradoresService.crear.mockResolvedValue({ id_admin: 1 });

      await AdministradoresController.crear(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('debería llamar next con error', async () => {
      AdministradoresService.crear.mockRejectedValue(new Error('fail'));

      await AdministradoresController.crear(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('obtenerTodos', () => {
    it('debería retornar lista paginada', async () => {
      req.query = { limit: '10', offset: '0' };
      AdministradoresService.obtenerTodos.mockResolvedValue({ total: 0, administradores: [] });

      await AdministradoresController.obtenerTodos(req, res, next);

      expect(AdministradoresService.obtenerTodos).toHaveBeenCalledWith(10, 0);
    });
  });

  describe('obtenerPorId', () => {
    it('debería retornar un administrador', async () => {
      req.params.id = '1';
      AdministradoresService.obtenerPorId.mockResolvedValue({ id_admin: 1 });

      await AdministradoresController.obtenerPorId(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ id_admin: 1 });
    });
  });

  describe('actualizar', () => {
    it('debería actualizar un administrador', async () => {
      req.params.id = '1';
      req.body = { credenciales: 'updated' };
      AdministradoresService.actualizar.mockResolvedValue({ credenciales: 'updated' });

      await AdministradoresController.actualizar(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ credenciales: 'updated' });
    });
  });

  describe('eliminar', () => {
    it('debería eliminar un administrador', async () => {
      req.params.id = '1';
      AdministradoresService.eliminar.mockResolvedValue({ mensaje: 'Administrador eliminado' });

      await AdministradoresController.eliminar(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Administrador eliminado' });
    });
  });
});
