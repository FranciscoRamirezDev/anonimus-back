const ComentariosController = require('../../../../src/modules/comentarios/comentarios.controller');
const ComentariosService = require('../../../../src/modules/comentarios/comentarios.service');

jest.mock('../../../../src/modules/comentarios/comentarios.service');

describe('Comentarios Controller', () => {
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
    it('debería crear comentario con id_usuario del token', async () => {
      req.body = { id_publicacion: 1, texto: 'Hola' };
      ComentariosService.crear.mockResolvedValue({ id_comentario: 1 });

      await ComentariosController.crear(req, res, next);

      expect(ComentariosService.crear).toHaveBeenCalledWith({
        id_publicacion: 1,
        texto: 'Hola',
        id_usuario: 1,
      });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('debería llamar next con error', async () => {
      ComentariosService.crear.mockRejectedValue(new Error('fail'));

      await ComentariosController.crear(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('obtenerTodos', () => {
    it('debería retornar lista paginada', async () => {
      req.query = { limit: '5', offset: '0' };
      ComentariosService.obtenerTodos.mockResolvedValue({ total: 0, comentarios: [] });

      await ComentariosController.obtenerTodos(req, res, next);

      expect(ComentariosService.obtenerTodos).toHaveBeenCalledWith(5, 0);
    });
  });

  describe('obtenerPorId', () => {
    it('debería retornar un comentario', async () => {
      req.params.id = '1';
      ComentariosService.obtenerPorId.mockResolvedValue({ id_comentario: 1 });

      await ComentariosController.obtenerPorId(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ id_comentario: 1 });
    });
  });

  describe('actualizar', () => {
    it('debería actualizar un comentario', async () => {
      req.params.id = '1';
      req.body = { texto: 'Updated' };
      ComentariosService.actualizar.mockResolvedValue({ texto: 'Updated' });

      await ComentariosController.actualizar(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ texto: 'Updated' });
    });
  });

  describe('eliminar', () => {
    it('debería eliminar un comentario', async () => {
      req.params.id = '1';
      ComentariosService.eliminar.mockResolvedValue({ mensaje: 'Comentario eliminado' });

      await ComentariosController.eliminar(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Comentario eliminado' });
    });
  });
});
