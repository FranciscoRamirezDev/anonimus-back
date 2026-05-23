const ReaccionesController = require('../../../../src/modules/reacciones/reacciones.controller');
const ReaccionesService = require('../../../../src/modules/reacciones/reacciones.service');

jest.mock('../../../../src/modules/reacciones/reacciones.service');

describe('Reacciones Controller', () => {
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
    it('debería retornar 201 al crear reacción', async () => {
      req.body = { id_publicacion: 1, tipo_reaccion: 'like' };
      ReaccionesService.crear.mockResolvedValue({ id_reaccion: 1 });

      await ReaccionesController.crear(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('debería llamar next con error', async () => {
      ReaccionesService.crear.mockRejectedValue(new Error('fail'));

      await ReaccionesController.crear(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('obtenerTodos', () => {
    it('debería retornar lista paginada', async () => {
      req.query = { limit: '10', offset: '0' };
      ReaccionesService.obtenerTodos.mockResolvedValue({ total: 0, reacciones: [] });

      await ReaccionesController.obtenerTodos(req, res, next);

      expect(ReaccionesService.obtenerTodos).toHaveBeenCalledWith(10, 0);
    });
  });

  describe('obtenerPorId', () => {
    it('debería retornar una reacción', async () => {
      req.params.id = '1';
      ReaccionesService.obtenerPorId.mockResolvedValue({ id_reaccion: 1 });

      await ReaccionesController.obtenerPorId(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ id_reaccion: 1 });
    });
  });

  describe('actualizar', () => {
    it('debería actualizar una reacción', async () => {
      req.params.id = '1';
      req.body = { tipo_reaccion: 'love' };
      ReaccionesService.actualizar.mockResolvedValue({ tipo_reaccion: 'love' });

      await ReaccionesController.actualizar(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ tipo_reaccion: 'love' });
    });
  });

  describe('eliminar', () => {
    it('debería eliminar una reacción', async () => {
      req.params.id = '1';
      ReaccionesService.eliminar.mockResolvedValue({ mensaje: 'Reaccion eliminado' });

      await ReaccionesController.eliminar(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Reaccion eliminado' });
    });
  });
});
