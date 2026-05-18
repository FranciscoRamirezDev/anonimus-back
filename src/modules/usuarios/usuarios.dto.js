const { body } = require('express-validator');

const crearUsuarioDTO = [
  body('alias')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('El alias debe tener entre 3 y 50 caracteres'),
  body('password_hash')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
  body('avatar_url')
    .optional()
    .isURL()
    .withMessage('La URL del avatar no es válida'),
];

const actualizarUsuarioDTO = [
  body('alias')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('El alias debe tener entre 3 y 50 caracteres'),
  body('avatar_url')
    .optional()
    .isURL()
    .withMessage('La URL del avatar no es válida'),
];

module.exports = {
  crearUsuarioDTO,
  actualizarUsuarioDTO,
};
