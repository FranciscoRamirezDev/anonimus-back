const errorHandler = require('../../../src/middlewares/errorHandler');

describe('Error Handler Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it('debería retornar 500 por defecto si no hay statusCode', () => {
    const err = new Error('Error genérico');

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Error genérico' })
    );
  });

  it('debería usar el statusCode del error si existe', () => {
    const err = new Error('No encontrado');
    err.statusCode = 404;

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'No encontrado' })
    );
  });

  it('debería incluir stack trace en desarrollo', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const err = new Error('Error dev');
    errorHandler(err, req, res, next);

    const response = res.json.mock.calls[0][0];
    expect(response.stack).toBeDefined();

    process.env.NODE_ENV = originalEnv;
  });

  it('no debería incluir stack trace en producción', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const err = new Error('Error prod');
    errorHandler(err, req, res, next);

    const response = res.json.mock.calls[0][0];
    expect(response.stack).toBeUndefined();

    process.env.NODE_ENV = originalEnv;
  });

  it('debería usar mensaje por defecto si el error no tiene message', () => {
    const err = {};
    err.stack = 'stack';

    errorHandler(err, req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Error interno del servidor' })
    );
  });

  it('debería loguear el stack del error', () => {
    const err = new Error('test');
    errorHandler(err, req, res, next);

    expect(console.error).toHaveBeenCalledWith(err.stack);
  });
});
