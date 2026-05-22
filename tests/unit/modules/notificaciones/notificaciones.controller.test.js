const NotificacionesController = require('../../../../src/modules/notificaciones/notificaciones.controller');
const NotificacionesService = require('../../../../src/modules/notificaciones/notificaciones.service');

jest.mock('../../../../src/modules/notificaciones/notificaciones.service');

describe('Notificaciones Controller', () => {
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
    it('debería crear notificación con id_usuario del token', async () => {
      req.body = { mensaje: 'Alerta' };
      NotificacionesService.crear.mockResolvedValue({ id_notificacion: 1 });

      await NotificacionesController.crear(req, res, next);

      expect(NotificacionesService.crear).toHaveBeenCalledWith({
        mensaje: 'Alerta',
        id_usuario: 1,
      });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('debería llamar next con error', async () => {
      NotificacionesService.crear.mockRejectedValue(new Error('fail'));

      await NotificacionesController.crear(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('obtenerTodos', () => {
    it('debería retornar lista paginada', async () => {
      req.query = { limit: '10', offset: '0' };
      NotificacionesService.obtenerTodos.mockResolvedValue({ total: 0, notificaciones: [] });

      await NotificacionesController.obtenerTodos(req, res, next);

      expect(NotificacionesService.obtenerTodos).toHaveBeenCalledWith(10, 0);
    });
  });

  describe('obtenerPorId', () => {
    it('debería retornar una notificación', async () => {
      req.params.id = '1';
      NotificacionesService.obtenerPorId.mockResolvedValue({ id_notificacion: 1 });

      await NotificacionesController.obtenerPorId(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ id_notificacion: 1 });
    });
  });

  describe('actualizar', () => {
    it('debería actualizar una notificación', async () => {
      req.params.id = '1';
      req.body = { mensaje: 'Updated' };
      NotificacionesService.actualizar.mockResolvedValue({ mensaje: 'Updated' });

      await NotificacionesController.actualizar(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Updated' });
    });
  });

  describe('eliminar', () => {
    it('debería eliminar una notificación', async () => {
      req.params.id = '1';
      NotificacionesService.eliminar.mockResolvedValue({ mensaje: 'Notificacion eliminado' });

      await NotificacionesController.eliminar(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Notificacion eliminado' });
    });
  });
});
