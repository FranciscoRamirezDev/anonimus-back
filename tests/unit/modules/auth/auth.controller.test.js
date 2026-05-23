const authController = require('../../../../src/modules/auth/auth.controller');
const authService = require('../../../../src/modules/auth/auth.service');

jest.mock('../../../../src/modules/auth/auth.service');

describe('Auth Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  describe('register', () => {
    it('debería retornar 201 al registrar exitosamente', async () => {
      const mockResult = {
        message: 'Usuario registrado exitosamente',
        user: { id_usuario: 1, alias: 'nuevo' },
        token: 'mock-token',
      };
      req.body = { alias: 'nuevo', password_hash: 'password123' };
      authService.register.mockResolvedValue(mockResult);

      await authController.register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('debería llamar next con error si el registro falla', async () => {
      const error = new Error('El alias ya está en uso');
      error.statusCode = 409;
      authService.register.mockRejectedValue(error);

      await authController.register(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('login', () => {
    it('debería retornar 200 al logear exitosamente', async () => {
      const mockResult = {
        message: 'Login exitoso',
        user: { id_usuario: 1, alias: 'test_user' },
        token: 'mock-token',
      };
      req.body = { alias: 'test_user', password_hash: 'password123' };
      authService.login.mockResolvedValue(mockResult);

      await authController.login(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('debería llamar next con error si el login falla', async () => {
      const error = new Error('Alias o contraseña incorrectos');
      error.statusCode = 401;
      authService.login.mockRejectedValue(error);

      await authController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
