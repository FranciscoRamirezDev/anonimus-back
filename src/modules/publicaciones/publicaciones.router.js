const { Router } = require('express');
const PublicacionController = require('./publicaciones.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

router.post('/', authMiddleware, PublicacionController.crear);
router.get('/', authMiddleware, PublicacionController.obtenerTodos);
router.get('/:id', authMiddleware, PublicacionController.obtenerPorId);
router.put('/:id', authMiddleware, PublicacionController.actualizar);
router.delete('/:id', authMiddleware, PublicacionController.eliminar);

module.exports = router;
