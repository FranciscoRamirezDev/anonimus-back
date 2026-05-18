const { Router } = require('express');
const UsuarioController = require('./usuarios.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

router.post('/', UsuarioController.crear);
router.get('/', authMiddleware, UsuarioController.obtenerTodos);
router.get('/:id', authMiddleware, UsuarioController.obtenerPorId);
router.put('/:id', authMiddleware, UsuarioController.actualizar);
router.delete('/:id', authMiddleware, UsuarioController.eliminar);

module.exports = router;
