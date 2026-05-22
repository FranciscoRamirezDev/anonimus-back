describe('Environment Config', () => {
  it('debería exportar todas las propiedades requeridas', () => {
    const env = require('../../../src/config/env');

    expect(env).toHaveProperty('PORT');
    expect(env).toHaveProperty('NODE_ENV');
    expect(env).toHaveProperty('CLIENT_URL');
    expect(env).toHaveProperty('DB_HOST');
    expect(env).toHaveProperty('DB_PORT');
    expect(env).toHaveProperty('DB_NAME');
    expect(env).toHaveProperty('DB_USER');
    expect(env).toHaveProperty('DB_PASSWORD');
    expect(env).toHaveProperty('DB_DIALECT');
    expect(env).toHaveProperty('JWT_SECRET');
  });

  it('PORT debería ser un número válido', () => {
    const env = require('../../../src/config/env');
    expect(Number(env.PORT)).toBeGreaterThan(0);
  });

  it('DB_DIALECT debería ser mysql por defecto', () => {
    const env = require('../../../src/config/env');
    expect(env.DB_DIALECT).toBe('mysql');
  });

  it('JWT_SECRET no debería estar vacío', () => {
    const env = require('../../../src/config/env');
    expect(env.JWT_SECRET.length).toBeGreaterThan(0);
  });
});
