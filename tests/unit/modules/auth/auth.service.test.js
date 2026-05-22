jest.mock('../../../../src/models', () => ({
  Usuario: {
    findOne: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('../../../../src/config/env', () => ({
  JWT_SECRET: 'test-secret',
}));

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../../../../src/models');
const authService = require('../../../../src/modules/auth/auth.service');

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jwt.sign.mockReturnValue('mock-token');
  });

  describe('register', () => {
    it('debería registrar un usuario nuevo exitosamente', async () => {
      const userData = { alias: 'nuevo_user', password_hash: 'password123' };
      Usuario.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashed-password');
      Usuario.create.mockResolvedValue({
        id_usuario: 1,
        alias: 'nuevo_user',
        avatar_url: null,
        fecha_registro: new Date(),
      });

      const result = await authService.register(userData);

      expect(result.message).toBe('Usuario registrado exitosamente');
      expect(result.token).toBe('mock-token');
      expect(result.user.alias).toBe('nuevo_user');
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    });

    it('debería lanzar error 409 si el alias ya existe', async () => {
      Usuario.findOne.mockResolvedValue({ id_usuario: 1, alias: 'existente' });

      await expect(authService.register({ alias: 'existente', password_hash: '12345678' }))
        .rejects
        .toMatchObject({ message: 'El alias ya está en uso', statusCode: 409 });
    });

    it('debería guardar avatar_url si se proporciona', async () => {
      const userData = {
        alias: 'user_avatar',
        password_hash: 'password123',
        avatar_url: 'https://example.com/avatar.jpg',
      };
      Usuario.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashed');
      Usuario.create.mockResolvedValue({
        id_usuario: 2,
        alias: 'user_avatar',
        avatar_url: 'https://example.com/avatar.jpg',
        fecha_registro: new Date(),
      });

      const result = await authService.register(userData);

      expect(Usuario.create).toHaveBeenCalledWith(
        expect.objectContaining({ avatar_url: 'https://example.com/avatar.jpg' })
      );
      expect(result.user.avatar_url).toBe('https://example.com/avatar.jpg');
    });

    it('debería setear avatar_url a null si no se proporciona', async () => {
      Usuario.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashed');
      Usuario.create.mockResolvedValue({
        id_usuario: 3,
        alias: 'sin_avatar',
        avatar_url: null,
        fecha_registro: new Date(),
      });

      await authService.register({ alias: 'sin_avatar', password_hash: 'password123' });

      expect(Usuario.create).toHaveBeenCalledWith(
        expect.objectContaining({ avatar_url: null })
      );
    });
  });

  describe('login', () => {
    it('debería logear exitosamente con credenciales válidas', async () => {
      const usuario = {
        id_usuario: 1,
        alias: 'test_user',
        password_hash: 'hashed',
        avatar_url: null,
        fecha_registro: new Date(),
      };
      Usuario.findOne.mockResolvedValue(usuario);
      bcrypt.compare.mockResolvedValue(true);

      const result = await authService.login({ alias: 'test_user', password_hash: 'password123' });

      expect(result.message).toBe('Login exitoso');
      expect(result.token).toBe('mock-token');
      expect(result.user.alias).toBe('test_user');
    });

    it('debería lanzar error 400 si falta alias', async () => {
      await expect(authService.login({ password_hash: 'password123' }))
        .rejects
        .toMatchObject({ statusCode: 400 });
    });

    it('debería lanzar error 400 si falta password', async () => {
      await expect(authService.login({ alias: 'test_user' }))
        .rejects
        .toMatchObject({ statusCode: 400 });
    });

    it('debería lanzar error 401 si el usuario no existe', async () => {
      Usuario.findOne.mockResolvedValue(null);

      await expect(authService.login({ alias: 'no_existe', password_hash: 'password123' }))
        .rejects
        .toMatchObject({ message: 'Alias o contraseña incorrectos', statusCode: 401 });
    });

    it('debería lanzar error 401 si la contraseña es incorrecta', async () => {
      Usuario.findOne.mockResolvedValue({
        id_usuario: 1,
        alias: 'test_user',
        password_hash: 'hashed',
      });
      bcrypt.compare.mockResolvedValue(false);

      await expect(authService.login({ alias: 'test_user', password_hash: 'wrong' }))
        .rejects
        .toMatchObject({ message: 'Alias o contraseña incorrectos', statusCode: 401 });
    });
  });

  describe('refreshToken', () => {
    it('debería renovar el token exitosamente', async () => {
      jwt.verify.mockReturnValue({ id_usuario: 1 });
      Usuario.findByPk.mockResolvedValue({
        id_usuario: 1,
        alias: 'test_user',
      });

      const result = await authService.refreshToken('old-token');

      expect(result.message).toBe('Token renovado');
      expect(result.token).toBe('mock-token');
    });

    it('debería lanzar error si el usuario no existe', async () => {
      jwt.verify.mockReturnValue({ id_usuario: 999 });
      Usuario.findByPk.mockResolvedValue(null);

      await expect(authService.refreshToken('old-token'))
        .rejects
        .toMatchObject({ statusCode: 401 });
    });

    it('debería lanzar error 401 si el token es inválido', async () => {
      jwt.verify.mockImplementation(() => { throw new Error('jwt malformed'); });

      await expect(authService.refreshToken('bad-token'))
        .rejects
        .toMatchObject({ statusCode: 401 });
    });
  });
});
