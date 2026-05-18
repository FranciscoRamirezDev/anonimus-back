const { body } = require('express-validator');

const crearPublicacionDTO = [
  body('id_usuario')
    .isUUID()
    .withMessage('ID de usuario inválido'),
  body('id_comunidad')
    .isUUID()
    .withMessage('ID de comunidad inválido'),
  body('contenido')
    .trim()
    .notEmpty()
    .withMessage('El contenido no puede estar vacío'),
];

const actualizarPublicacionDTO = [
  body('contenido')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El contenido no puede estar vacío'),
  body('es_valida')
    .optional()
    .isBoolean()
    .withMessage('es_valida debe ser booleano'),
];

module.exports = {
  crearPublicacionDTO,
  actualizarPublicacionDTO,
};
