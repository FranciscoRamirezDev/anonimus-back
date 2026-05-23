const RetosController = require('../../../../src/modules/retos/retos.controller');
const RetosService = require('../../../../src/modules/retos/retos.service');

jest.mock('../../../../src/modules/retos/retos.service');

describe('Retos Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
      user: { id_usuario: 1 },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  describe('crear', () => {
    it('debería crear reto con id_usuario del token', async () => {
      req.body = { titulo: 'Nuevo reto' };
      RetosService.crear.mockResolvedValue({ id_reto: 1 });

      await RetosController.crear(req, res, next);

      expect(RetosService.crear).toHaveBeenCalledWith({
        titulo: 'Nuevo reto',
        id_usuario: 1,
      });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('debería llamar next con error', async () => {
      RetosService.crear.mockRejectedValue(new Error('fail'));

      await RetosController.crear(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('obtenerTodos', () => {
    it('debería retornar lista paginada', async () => {
      req.query = { limit: '5', offset: '0' };
      RetosService.obtenerTodos.mockResolvedValue({ total: 0, retos: [] });

      await RetosController.obtenerTodos(req, res, next);

      expect(RetosService.obtenerTodos).toHaveBeenCalledWith(5, 0);
    });
  });

  describe('obtenerPorId', () => {
    it('debería retornar un reto', async () => {
      req.params.id = '1';
      RetosService.obtenerPorId.mockResolvedValue({ id_reto: 1 });

      await RetosController.obtenerPorId(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ id_reto: 1 });
    });
  });

  describe('actualizar', () => {
    it('debería actualizar un reto', async () => {
      req.params.id = '1';
      req.body = { progreso_pct: 75 };
      RetosService.actualizar.mockResolvedValue({ progreso_pct: 75 });

      await RetosController.actualizar(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ progreso_pct: 75 });
    });
  });

  describe('eliminar', () => {
    it('debería eliminar un reto', async () => {
      req.params.id = '1';
      RetosService.eliminar.mockResolvedValue({ mensaje: 'Reto eliminado' });

      await RetosController.eliminar(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Reto eliminado' });
    });
  });
});
