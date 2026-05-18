const { Router } = require('express');
const ComunidadController = require('./comunidades.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

router.post('/', authMiddleware, ComunidadController.crear);
router.get('/', authMiddleware, ComunidadController.obtenerTodos);
router.get('/:id', authMiddleware, ComunidadController.obtenerPorId);
router.put('/:id', authMiddleware, ComunidadController.actualizar);
router.delete('/:id', authMiddleware, ComunidadController.eliminar);

module.exports = router;
