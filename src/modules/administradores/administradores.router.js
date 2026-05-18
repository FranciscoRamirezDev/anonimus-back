const { Router } = require('express');
const AdministradorController = require('./administradores.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

router.post('/', authMiddleware, AdministradorController.crear);
router.get('/', authMiddleware, AdministradorController.obtenerTodos);
router.get('/:id', authMiddleware, AdministradorController.obtenerPorId);
router.put('/:id', authMiddleware, AdministradorController.actualizar);
router.delete('/:id', authMiddleware, AdministradorController.eliminar);

module.exports = router;
