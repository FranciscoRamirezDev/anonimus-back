const { Router } = require('express');
const usersController = require('./users.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

router.get('/', authMiddleware, usersController.getAll);
router.get('/:id', authMiddleware, usersController.getById);

module.exports = router;
