const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../../models');
const env = require('../../config/env');

/**
 * Generar JWT token
 */
const generateToken = (usuario) => {
  return jwt.sign(
    { id_usuario: usuario.id_usuario, alias: usuario.alias },
    env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '24h' }
  );
};

/**
 * Registrar nuevo usuario
 */
const register = async (data) => {
  const { alias, password_hash, avatar_url } = data;

  // Validar que el usuario no exista
  const usuarioExistente = await Usuario.findOne({
    where: { alias },
  });

  if (usuarioExistente) {
    const error = new Error('El alias ya está en uso');
    error.statusCode = 409;
    throw error;
  }

  // Hash de contraseña
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password_hash, saltRounds);

  // Crear usuario
  const nuevoUsuario = await Usuario.create({
    alias,
    password_hash: hashedPassword,
    avatar_url: avatar_url || null,
  });

  // Generar token
  const token = generateToken(nuevoUsuario);

  return {
    status: 201,
    message: 'Usuario registrado exitosamente',
    user: {
      id_usuario: nuevoUsuario.id_usuario,
      alias: nuevoUsuario.alias,
      avatar_url: nuevoUsuario.avatar_url,
      fecha_registro: nuevoUsuario.fecha_registro,
    },
    token,
  };
};

/**
 * Login de usuario
 */
const login = async (data) => {
  const { alias, password_hash } = data;

  // Validar que existan los datos
  if (!alias || !password_hash) {
    const error = new Error('Alias y contraseña son requeridos');
    error.statusCode = 400;
    throw error;
  }

  // Buscar usuario
  const usuario = await Usuario.findOne({
    where: { alias },
  });

  if (!usuario) {
    const error = new Error('Alias o contraseña incorrectos');
    error.statusCode = 401;
    throw error;
  }

  // Validar contraseña
  const esValida = await bcrypt.compare(password_hash, usuario.password_hash);

  if (!esValida) {
    const error = new Error('Alias o contraseña incorrectos');
    error.statusCode = 401;
    throw error;
  }

  // Generar token
  const token = generateToken(usuario);

  return {
    message: 'Login exitoso',
    user: {
      id_usuario: usuario.id_usuario,
      alias: usuario.alias,
      avatar_url: usuario.avatar_url,
      fecha_registro: usuario.fecha_registro,
    },
    token,
  };
};

/**
 * Refresh token
 */
const refreshToken = async (token) => {
  try {
    const decoded = jwt.verify(
      token,
      env.JWT_SECRET,
      { ignoreExpiration: true }
    );

    const usuario = await Usuario.findByPk(decoded.id_usuario);

    if (!usuario) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    }

    const nuevoToken = generateToken(usuario);

    return {
      message: 'Token renovado',
      token: nuevoToken,
    };
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
};

module.exports = { register, login, refreshToken };
