const { Router } = require('express');
const NotificacionController = require('./notificaciones.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: notificacións
 *     description: Gestión de notificacións
 */

/**
 * @swagger
 * /api/v1/notificacións:
 *   post:
 *     summary: Crear un nuevo notificación
 *     tags: [notificacións]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nombre: "Ejemplo de notificación"
 *     responses:
 *       201:
 *         description: notificación creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/', authMiddleware, NotificacionController.crear);

/**
 * @swagger
 * /api/v1/notificacións:
 *   get:
 *     summary: Listar todos los notificacións (paginado)
 *     tags: [notificacións]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de registros por página
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de registros a saltar
 *     responses:
 *       200:
 *         description: Lista de notificacións
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 notificacións:
 *                   type: array
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, NotificacionController.obtenerTodos);

/**
 * @swagger
 * /api/v1/notificacións/{id}:
 *   get:
 *     summary: Obtener un notificación por ID
 *     tags: [notificacións]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del notificación
 *     responses:
 *       200:
 *         description: notificación encontrado
 *       404:
 *         description: notificación no encontrado
 *       401:
 *         description: No autorizado
 */
router.get('/:id', authMiddleware, NotificacionController.obtenerPorId);

/**
 * @swagger
 * /api/v1/notificacións/{id}:
 *   put:
 *     summary: Actualizar un notificación
 *     tags: [notificacións]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: notificación actualizado
 *       404:
 *         description: notificación no encontrado
 *       401:
 *         description: No autorizado
 */
router.put('/:id', authMiddleware, NotificacionController.actualizar);

/**
 * @swagger
 * /api/v1/notificacións/{id}:
 *   delete:
 *     summary: Eliminar un notificación
 *     tags: [notificacións]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: notificación eliminado
 *       404:
 *         description: notificación no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete('/:id', authMiddleware, NotificacionController.eliminar);

module.exports = router;
