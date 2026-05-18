const { body } = require('express-validator');

const crearComunidadDTO = [
  body('nombre')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre debe tener entre 3 y 100 caracteres'),
  body('categoria')
    .trim()
    .notEmpty()
    .withMessage('La categoría es requerida'),
];

const actualizarComunidadDTO = [
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre debe tener entre 3 y 100 caracteres'),
  body('categoria')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('La categoría no puede estar vacía'),
];

module.exports = {
  crearComunidadDTO,
  actualizarComunidadDTO,
};
