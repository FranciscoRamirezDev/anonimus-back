const { Router } = require('express');
const ReaccionController = require('./reacciones.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

router.post('/', authMiddleware, ReaccionController.crear);
router.get('/', authMiddleware, ReaccionController.obtenerTodos);
router.get('/:id', authMiddleware, ReaccionController.obtenerPorId);
router.put('/:id', authMiddleware, ReaccionController.actualizar);
router.delete('/:id', authMiddleware, ReaccionController.eliminar);

module.exports = router;
