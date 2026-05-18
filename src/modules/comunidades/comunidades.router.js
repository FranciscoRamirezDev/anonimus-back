const { Router } = require('express');
const ComunidadController = require('./comunidades.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Comunidades
 *     description: Gestión de comunidades
 */

/**
 * @swagger
 * /api/v1/comunidades:
 *   post:
 *     summary: Crear un nuevo comunidade
 *     tags: [Comunidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nombre: "Ejemplo de comunidade"
 *     responses:
 *       201:
 *         description: comunidade creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/', authMiddleware, ComunidadController.crear);

/**
 * @swagger
 * /api/v1/comunidades:
 *   get:
 *     summary: Listar todos los comunidades (paginado)
 *     tags: [Comunidades]
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
 *         description: Lista de comunidades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 comunidades:
 *                   type: array
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, ComunidadController.obtenerTodos);

/**
 * @swagger
 * /api/v1/comunidades/{id}:
 *   get:
 *     summary: Obtener un comunidade por ID
 *     tags: [Comunidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del comunidade
 *     responses:
 *       200:
 *         description: comunidade encontrado
 *       404:
 *         description: comunidade no encontrado
 *       401:
 *         description: No autorizado
 */
router.get('/:id', authMiddleware, ComunidadController.obtenerPorId);

/**
 * @swagger
 * /api/v1/comunidades/{id}:
 *   put:
 *     summary: Actualizar un comunidade
 *     tags: [Comunidades]
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
 *         description: comunidade actualizado
 *       404:
 *         description: comunidade no encontrado
 *       401:
 *         description: No autorizado
 */
router.put('/:id', authMiddleware, ComunidadController.actualizar);

/**
 * @swagger
 * /api/v1/comunidades/{id}:
 *   delete:
 *     summary: Eliminar un comunidade
 *     tags: [Comunidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: comunidade eliminado
 *       404:
 *         description: comunidade no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete('/:id', authMiddleware, ComunidadController.eliminar);

module.exports = router;
