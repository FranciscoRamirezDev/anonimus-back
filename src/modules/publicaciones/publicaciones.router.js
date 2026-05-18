const { Router } = require('express');
const PublicacionController = require('./publicaciones.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Publicaciones
 *     description: Gestión de publicaciones
 */

/**
 * @swagger
 * /api/v1/publicaciones:
 *   post:
 *     summary: Crear una nueva publicación
 *     tags: [Publicaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_comunidad
 *               - contenido
 *             properties:
 *               id_comunidad:
 *                 type: string
 *                 format: uuid
 *                 description: ID de la comunidad donde se publica
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               contenido:
 *                 type: string
 *                 description: Contenido de la publicación
 *                 example: "Este es mi primer post en la comunidad"
 *     responses:
 *       201:
 *         description: Publicación creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/', authMiddleware, PublicacionController.crear);

/**
 * @swagger
 * /api/v1/publicaciones:
 *   get:
 *     summary: Listar todos las publicaciones (paginado)
 *     tags: [Publicaciones]
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
 *         description: Lista de publicaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 publicaciones:
 *                   type: array
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, PublicacionController.obtenerTodos);

/**
 * @swagger
 * /api/v1/publicaciones/{id}:
 *   get:
 *     summary: Obtener una publicación por ID
 *     tags: [Publicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del publicacione
 *     responses:
 *       200:
 *         description: publicacione encontrado
 *       404:
 *         description: publicacione no encontrado
 *       401:
 *         description: No autorizado
 */
router.get('/:id', authMiddleware, PublicacionController.obtenerPorId);

/**
 * @swagger
 * /api/v1/publicaciones/{id}:
 *   put:
 *     summary: Actualizar una publicación
 *     tags: [Publicaciones]
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
 *         description: publicacione actualizado
 *       404:
 *         description: publicacione no encontrado
 *       401:
 *         description: No autorizado
 */
router.put('/:id', authMiddleware, PublicacionController.actualizar);

/**
 * @swagger
 * /api/v1/publicaciones/{id}:
 *   delete:
 *     summary: Eliminar una publicación
 *     tags: [Publicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: publicacione eliminado
 *       404:
 *         description: publicacione no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete('/:id', authMiddleware, PublicacionController.eliminar);

module.exports = router;
