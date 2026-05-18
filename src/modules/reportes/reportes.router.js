const { Router } = require('express');
const ReporteController = require('./reportes.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

router.post('/', authMiddleware, ReporteController.crear);
router.get('/', authMiddleware, ReporteController.obtenerTodos);
router.get('/:id', authMiddleware, ReporteController.obtenerPorId);
router.put('/:id', authMiddleware, ReporteController.actualizar);
router.delete('/:id', authMiddleware, ReporteController.eliminar);

module.exports = router;
