const ReportesController = require('../../../../src/modules/reportes/reportes.controller');
const ReportesService = require('../../../../src/modules/reportes/reportes.service');

jest.mock('../../../../src/modules/reportes/reportes.service');

describe('Reportes Controller', () => {
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
    it('debería retornar 201 al crear reporte', async () => {
      req.body = { id_publicacion: 1, id_admin: 1 };
      ReportesService.crear.mockResolvedValue({ id_reporte: 1 });

      await ReportesController.crear(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('debería llamar next con error', async () => {
      ReportesService.crear.mockRejectedValue(new Error('fail'));

      await ReportesController.crear(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('obtenerTodos', () => {
    it('debería retornar lista paginada', async () => {
      req.query = { limit: '10', offset: '0' };
      ReportesService.obtenerTodos.mockResolvedValue({ total: 0, reportes: [] });

      await ReportesController.obtenerTodos(req, res, next);

      expect(ReportesService.obtenerTodos).toHaveBeenCalledWith(10, 0);
    });
  });

  describe('obtenerPorId', () => {
    it('debería retornar un reporte', async () => {
      req.params.id = '1';
      ReportesService.obtenerPorId.mockResolvedValue({ id_reporte: 1 });

      await ReportesController.obtenerPorId(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ id_reporte: 1 });
    });
  });

  describe('actualizar', () => {
    it('debería actualizar un reporte', async () => {
      req.params.id = '1';
      req.body = { estado: 'revisado' };
      ReportesService.actualizar.mockResolvedValue({ estado: 'revisado' });

      await ReportesController.actualizar(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ estado: 'revisado' });
    });
  });

  describe('eliminar', () => {
    it('debería eliminar un reporte', async () => {
      req.params.id = '1';
      ReportesService.eliminar.mockResolvedValue({ mensaje: 'Reporte eliminado' });

      await ReportesController.eliminar(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Reporte eliminado' });
    });
  });
});
