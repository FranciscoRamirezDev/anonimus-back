const { Router } = require('express');
const ReaccionController = require('./reacciones.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Reacciones
 *     description: Gestión de reacciones
 */

/**
 * @swagger
 * /api/v1/reacciones:
 *   post:
 *     summary: Crear un nuevo reaccione
 *     tags: [Reacciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nombre: "Ejemplo de reaccione"
 *     responses:
 *       201:
 *         description: reacción creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/', authMiddleware, ReaccionController.crear);

/**
 * @swagger
 * /api/v1/reacciones:
 *   get:
 *     summary: Listar todos las reacciones (paginado)
 *     tags: [Reacciones]
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
 *         description: Lista de reacciones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 reacciones:
 *                   type: array
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, ReaccionController.obtenerTodos);

/**
 * @swagger
 * /api/v1/reacciones/{id}:
 *   get:
 *     summary: Obtener un reaccione por ID
 *     tags: [Reacciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del reaccione
 *     responses:
 *       200:
 *         description: reaccione encontrado
 *       404:
 *         description: reaccione no encontrado
 *       401:
 *         description: No autorizado
 */
router.get('/:id', authMiddleware, ReaccionController.obtenerPorId);

/**
 * @swagger
 * /api/v1/reacciones/{id}:
 *   put:
 *     summary: Actualizar un reaccione
 *     tags: [Reacciones]
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
 *         description: reaccione actualizado
 *       404:
 *         description: reaccione no encontrado
 *       401:
 *         description: No autorizado
 */
router.put('/:id', authMiddleware, ReaccionController.actualizar);

/**
 * @swagger
 * /api/v1/reacciones/{id}:
 *   delete:
 *     summary: Eliminar un reaccione
 *     tags: [Reacciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: reaccione eliminado
 *       404:
 *         description: reaccione no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete('/:id', authMiddleware, ReaccionController.eliminar);

module.exports = router;
