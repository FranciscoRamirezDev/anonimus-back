const { Router } = require('express');
const ComentarioController = require('./comentarios.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

router.post('/', authMiddleware, ComentarioController.crear);
router.get('/', authMiddleware, ComentarioController.obtenerTodos);
router.get('/:id', authMiddleware, ComentarioController.obtenerPorId);
router.put('/:id', authMiddleware, ComentarioController.actualizar);
router.delete('/:id', authMiddleware, ComentarioController.eliminar);

module.exports = router;
