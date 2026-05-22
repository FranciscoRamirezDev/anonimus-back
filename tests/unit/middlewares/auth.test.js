const jwt = require('jsonwebtoken');
const authMiddleware = require('../../../src/middlewares/auth');
const env = require('../../../src/config/env');

jest.mock('jsonwebtoken');
jest.mock('../../../src/config/env', () => ({
  JWT_SECRET: 'test-secret',
}));

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it('debería retornar 401 si no se proporciona token', () => {
    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token no proporcionado' });
    expect(next).not.toHaveBeenCalled();
  });

  it('debería retornar 401 si el header Authorization no tiene Bearer', () => {
    req.headers.authorization = 'invalid-token';

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('debería retornar 401 si el token es inválido', () => {
    req.headers.authorization = 'Bearer invalid-token';
    jwt.verify.mockImplementation(() => { throw new Error('Token inválido'); });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token inválido' });
    expect(next).not.toHaveBeenCalled();
  });

  it('debería llamar next() y agregar user al request si el token es válido', () => {
    const payload = { id_usuario: 1, alias: 'test_user' };
    req.headers.authorization = 'Bearer valid-token';
    jwt.verify.mockReturnValue(payload);

    authMiddleware(req, res, next);

    expect(req.user).toEqual(payload);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('debería verificar el token con el JWT_SECRET correcto', () => {
    req.headers.authorization = 'Bearer some-token';
    jwt.verify.mockReturnValue({ id_usuario: 1 });

    authMiddleware(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('some-token', 'test-secret');
  });
});
