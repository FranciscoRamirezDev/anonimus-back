const { Router } = require('express');
const NotificacionController = require('./notificaciones.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

router.post('/', authMiddleware, NotificacionController.crear);
router.get('/', authMiddleware, NotificacionController.obtenerTodos);
router.get('/:id', authMiddleware, NotificacionController.obtenerPorId);
router.put('/:id', authMiddleware, NotificacionController.actualizar);
router.delete('/:id', authMiddleware, NotificacionController.eliminar);

module.exports = router;
