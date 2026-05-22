const PublicacionesController = require('../../../../src/modules/publicaciones/publicaciones.controller');
const PublicacionesService = require('../../../../src/modules/publicaciones/publicaciones.service');

jest.mock('../../../../src/modules/publicaciones/publicaciones.service');

describe('Publicaciones Controller', () => {
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
    it('debería crear publicación con id_usuario del token', async () => {
      req.body = { id_comunidad: 1, contenido: 'Test' };
      PublicacionesService.crear.mockResolvedValue({ id_publicacion: 1 });

      await PublicacionesController.crear(req, res, next);

      expect(PublicacionesService.crear).toHaveBeenCalledWith({
        id_comunidad: 1,
        contenido: 'Test',
        id_usuario: 1,
      });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('debería llamar next con error', async () => {
      PublicacionesService.crear.mockRejectedValue(new Error('fail'));

      await PublicacionesController.crear(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('obtenerTodos', () => {
    it('debería retornar lista paginada', async () => {
      req.query = { limit: '5', offset: '10' };
      PublicacionesService.obtenerTodos.mockResolvedValue({ total: 0, publicaciones: [] });

      await PublicacionesController.obtenerTodos(req, res, next);

      expect(PublicacionesService.obtenerTodos).toHaveBeenCalledWith(5, 10);
    });

    it('debería limitar max a 100 y offset min a 0', async () => {
      req.query = { limit: '999', offset: '-10' };
      PublicacionesService.obtenerTodos.mockResolvedValue({ total: 0, publicaciones: [] });

      await PublicacionesController.obtenerTodos(req, res, next);

      expect(PublicacionesService.obtenerTodos).toHaveBeenCalledWith(100, 0);
    });
  });

  describe('obtenerPorId', () => {
    it('debería retornar una publicación', async () => {
      req.params.id = '1';
      PublicacionesService.obtenerPorId.mockResolvedValue({ id_publicacion: 1 });

      await PublicacionesController.obtenerPorId(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ id_publicacion: 1 });
    });
  });

  describe('actualizar', () => {
    it('debería actualizar una publicación', async () => {
      req.params.id = '1';
      req.body = { contenido: 'Updated' };
      PublicacionesService.actualizar.mockResolvedValue({ contenido: 'Updated' });

      await PublicacionesController.actualizar(req, res, next);

      expect(PublicacionesService.actualizar).toHaveBeenCalledWith('1', { contenido: 'Updated' });
    });
  });

  describe('eliminar', () => {
    it('debería eliminar una publicación', async () => {
      req.params.id = '1';
      PublicacionesService.eliminar.mockResolvedValue({ mensaje: 'Publicacion eliminado' });

      await PublicacionesController.eliminar(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Publicacion eliminado' });
    });
  });
});
