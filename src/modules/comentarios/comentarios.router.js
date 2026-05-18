const { Router } = require('express');
const ComentarioController = require('./comentarios.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Comentarios
 *     description: Gestión de comentarios
 */

/**
 * @swagger
 * /api/v1/comentarios:
 *   post:
 *     summary: Crear un nuevo comentario
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nombre: "Ejemplo de comentario"
 *     responses:
 *       201:
 *         description: comentario creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/', authMiddleware, ComentarioController.crear);

/**
 * @swagger
 * /api/v1/comentarios:
 *   get:
 *     summary: Listar todos los comentarios (paginado)
 *     tags: [Comentarios]
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
 *         description: Lista de comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 comentarios:
 *                   type: array
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, ComentarioController.obtenerTodos);

/**
 * @swagger
 * /api/v1/comentarios/{id}:
 *   get:
 *     summary: Obtener un comentario por ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: comentario encontrado
 *       404:
 *         description: comentario no encontrado
 *       401:
 *         description: No autorizado
 */
router.get('/:id', authMiddleware, ComentarioController.obtenerPorId);

/**
 * @swagger
 * /api/v1/comentarios/{id}:
 *   put:
 *     summary: Actualizar un comentario
 *     tags: [Comentarios]
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
 *         description: comentario actualizado
 *       404:
 *         description: comentario no encontrado
 *       401:
 *         description: No autorizado
 */
router.put('/:id', authMiddleware, ComentarioController.actualizar);

/**
 * @swagger
 * /api/v1/comentarios/{id}:
 *   delete:
 *     summary: Eliminar un comentario
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: comentario eliminado
 *       404:
 *         description: comentario no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete('/:id', authMiddleware, ComentarioController.eliminar);

module.exports = router;
