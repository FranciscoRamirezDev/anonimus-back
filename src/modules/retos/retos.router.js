const { Router } = require('express');
const RetoController = require('./retos.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

router.post('/', authMiddleware, RetoController.crear);
router.get('/', authMiddleware, RetoController.obtenerTodos);
router.get('/:id', authMiddleware, RetoController.obtenerPorId);
router.put('/:id', authMiddleware, RetoController.actualizar);
router.delete('/:id', authMiddleware, RetoController.eliminar);

module.exports = router;
