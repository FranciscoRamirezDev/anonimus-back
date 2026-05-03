const { Router } = require('express');
const tasksController = require('./tasks.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

router.get('/', authMiddleware, tasksController.getAll);
router.post('/', authMiddleware, tasksController.create);

module.exports = router;
