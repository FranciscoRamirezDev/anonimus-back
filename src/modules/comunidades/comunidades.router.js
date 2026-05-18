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
 *     summary: Crear un nuevo comunidades
 *     tags: [Comunidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - categoria
 *             properties:
 *               nombre:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 description: Nombre único de la comunidad
 *                 example: "Comunidad de Tecnología"
 *               categoria:
 *                 type: string
 *                 maxLength: 50
 *                 description: Categoría de la comunidad
 *                 example: "Tecnología"
 *     responses:
 *       201:
 *         description: comunidades creado exitosamente
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
 *     summary: Listar todos las comunidades (paginado)
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
 *     summary: Obtener un comunidades por ID
 *     tags: [Comunidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del comunidades
 *     responses:
 *       200:
 *         description: comunidades encontrado
 *       404:
 *         description: comunidades no encontrado
 *       401:
 *         description: No autorizado
 */
router.get('/:id', authMiddleware, ComunidadController.obtenerPorId);

/**
 * @swagger
 * /api/v1/comunidades/{id}:
 *   put:
 *     summary: Actualizar un comunidades
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
 *         description: comunidades actualizado
 *       404:
 *         description: comunidades no encontrado
 *       401:
 *         description: No autorizado
 */
router.put('/:id', authMiddleware, ComunidadController.actualizar);

/**
 * @swagger
 * /api/v1/comunidades/{id}:
 *   delete:
 *     summary: Eliminar un comunidades
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
 *         description: comunidades eliminado
 *       404:
 *         description: comunidades no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete('/:id', authMiddleware, ComunidadController.eliminar);

module.exports = router;
