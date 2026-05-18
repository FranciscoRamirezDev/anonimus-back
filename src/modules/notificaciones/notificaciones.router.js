const { Router } = require('express');
const NotificacionController = require('./notificaciones.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Notificaciones
 *     description: Gestión de notificaciones
 */

/**
 * @swagger
 * /api/v1/notificaciones:
 *   post:
 *     summary: Crear una nueva notificación
 *     tags: [Notificaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mensaje
 *             properties:
 *               mensaje:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *                 description: Contenido del mensaje de notificación
 *                 example: "Alguien reaccionó a tu publicación"
 *     responses:
 *       201:
 *         description: Notificación creada exitosamente
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
 * /api/v1/notificaciones:
 *   get:
 *     summary: Listar todos los notificaciones (paginado)
 *     tags: [notificaciones]
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
 *         description: Lista de notificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 notificaciones:
 *                   type: array
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, NotificacionController.obtenerTodos);

/**
 * @swagger
 * /api/v1/notificaciones/{id}:
 *   get:
 *     summary: Obtener un notificación por ID
 *     tags: [notificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 * /api/v1/notificaciones/{id}:
 *   put:
 *     summary: Actualizar un notificación
 *     tags: [notificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 * /api/v1/notificaciones/{id}:
 *   delete:
 *     summary: Eliminar un notificación
 *     tags: [notificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
