const { validationResult } = require('express-validator');
const validate = require('../../../src/middlewares/validate');

jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

describe('Validate Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it('debería llamar next() si no hay errores de validación', () => {
    validationResult.mockReturnValue({ isEmpty: () => true, array: () => [] });

    validate(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('debería retornar 400 con errores si hay errores de validación', () => {
    const errors = [
      { msg: 'El alias es requerido', path: 'alias' },
    ];
    validationResult.mockReturnValue({ isEmpty: () => false, array: () => errors });

    validate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors });
    expect(next).not.toHaveBeenCalled();
  });

  it('debería retornar múltiples errores de validación', () => {
    const errors = [
      { msg: 'El alias es requerido', path: 'alias' },
      { msg: 'La contraseña es requerida', path: 'password_hash' },
    ];
    validationResult.mockReturnValue({ isEmpty: () => false, array: () => errors });

    validate(req, res, next);

    expect(res.json).toHaveBeenCalledWith({ errors });
    expect(errors).toHaveLength(2);
  });
});
