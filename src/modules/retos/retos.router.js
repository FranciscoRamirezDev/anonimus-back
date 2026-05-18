const { Router } = require('express');
const RetoController = require('./retos.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Retos
 *     description: Gestión de retos/desafíos
 */

/**
 * @swagger
 * /api/v1/retos:
 *   post:
 *     summary: Crear un nuevo reto/desafío
 *     tags: [Retos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *             properties:
 *               titulo:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 description: Título del reto
 *                 example: "Publicar 5 veces esta semana"
 *               progreso_pct:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 100
 *                 default: 0
 *                 description: Porcentaje de progreso del reto (0-100)
 *                 example: 0
 *     responses:
 *       201:
 *         description: Reto creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/', authMiddleware, RetoController.crear);

/**
 * @swagger
 * /api/v1/retos:
 *   get:
 *     summary: Listar todos los retos (paginado)
 *     tags: [Retos]
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
 *         description: Lista de retos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 retos:
 *                   type: array
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, RetoController.obtenerTodos);

/**
 * @swagger
 * /api/v1/retos/{id}:
 *   get:
 *     summary: Obtener un reto por ID
 *     tags: [Retos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del reto
 *     responses:
 *       200:
 *         description: reto encontrado
 *       404:
 *         description: reto no encontrado
 *       401:
 *         description: No autorizado
 */
router.get('/:id', authMiddleware, RetoController.obtenerPorId);

/**
 * @swagger
 * /api/v1/retos/{id}:
 *   put:
 *     summary: Actualizar un reto
 *     tags: [Retos]
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
 *         description: reto actualizado
 *       404:
 *         description: reto no encontrado
 *       401:
 *         description: No autorizado
 */
router.put('/:id', authMiddleware, RetoController.actualizar);

/**
 * @swagger
 * /api/v1/retos/{id}:
 *   delete:
 *     summary: Eliminar un reto
 *     tags: [Retos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: reto eliminado
 *       404:
 *         description: reto no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete('/:id', authMiddleware, RetoController.eliminar);

module.exports = router;
