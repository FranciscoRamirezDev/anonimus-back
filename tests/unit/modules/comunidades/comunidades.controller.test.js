const ComunidadesController = require('../../../../src/modules/comunidades/comunidades.controller');
const ComunidadesService = require('../../../../src/modules/comunidades/comunidades.service');

jest.mock('../../../../src/modules/comunidades/comunidades.service');

describe('Comunidades Controller', () => {
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
    it('debería retornar 201 al crear comunidad', async () => {
      const mockCom = { id_comunidad: 1, nombre: 'Tech' };
      req.body = { nombre: 'Tech', categoria: 'Tecnología' };
      ComunidadesService.crear.mockResolvedValue(mockCom);

      await ComunidadesController.crear(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockCom);
    });

    it('debería llamar next con error', async () => {
      ComunidadesService.crear.mockRejectedValue(new Error('fail'));

      await ComunidadesController.crear(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('obtenerTodos', () => {
    it('debería retornar lista paginada', async () => {
      req.query = { limit: '5', offset: '0' };
      ComunidadesService.obtenerTodos.mockResolvedValue({ total: 0, comunidades: [] });

      await ComunidadesController.obtenerTodos(req, res, next);

      expect(ComunidadesService.obtenerTodos).toHaveBeenCalledWith(5, 0);
    });

    it('debería limitar max a 100', async () => {
      req.query = { limit: '200' };
      ComunidadesService.obtenerTodos.mockResolvedValue({ total: 0, comunidades: [] });

      await ComunidadesController.obtenerTodos(req, res, next);

      expect(ComunidadesService.obtenerTodos).toHaveBeenCalledWith(100, 0);
    });
  });

  describe('obtenerPorId', () => {
    it('debería retornar una comunidad', async () => {
      req.params.id = '1';
      ComunidadesService.obtenerPorId.mockResolvedValue({ id_comunidad: 1 });

      await ComunidadesController.obtenerPorId(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ id_comunidad: 1 });
    });
  });

  describe('actualizar', () => {
    it('debería actualizar una comunidad', async () => {
      req.params.id = '1';
      req.body = { nombre: 'Updated' };
      ComunidadesService.actualizar.mockResolvedValue({ id_comunidad: 1, nombre: 'Updated' });

      await ComunidadesController.actualizar(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ id_comunidad: 1, nombre: 'Updated' });
    });
  });

  describe('eliminar', () => {
    it('debería eliminar una comunidad', async () => {
      req.params.id = '1';
      ComunidadesService.eliminar.mockResolvedValue({ mensaje: 'Comunidad eliminado' });

      await ComunidadesController.eliminar(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Comunidad eliminado' });
    });
  });
});
