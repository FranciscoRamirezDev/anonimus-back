const { Router } = require('express');
const AdministradorController = require('./administradores.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Administradores
 *     description: Gestión de administradores
 */

/**
 * @swagger
 * /api/v1/administradores:
 *   post:
 *     summary: Crear un nuevo administradore
 *     tags: [Administradores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nombre: "Ejemplo de administradore"
 *     responses:
 *       201:
 *         description: administradore creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/', authMiddleware, AdministradorController.crear);

/**
 * @swagger
 * /api/v1/administradores:
 *   get:
 *     summary: Listar todos los administradores (paginado)
 *     tags: [Administradores]
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
 *         description: Lista de administradores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 administradores:
 *                   type: array
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, AdministradorController.obtenerTodos);

/**
 * @swagger
 * /api/v1/administradores/{id}:
 *   get:
 *     summary: Obtener un administrador por ID
 *     tags: [Administradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del administradore
 *     responses:
 *       200:
 *         description: administradore encontrado
 *       404:
 *         description: administradore no encontrado
 *       401:
 *         description: No autorizado
 */
router.get('/:id', authMiddleware, AdministradorController.obtenerPorId);

/**
 * @swagger
 * /api/v1/administradores/{id}:
 *   put:
 *     summary: Actualizar un administrador
 *     tags: [Administradores]
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
 *         description: administradore actualizado
 *       404:
 *         description: administradore no encontrado
 *       401:
 *         description: No autorizado
 */
router.put('/:id', authMiddleware, AdministradorController.actualizar);

/**
 * @swagger
 * /api/v1/administradores/{id}:
 *   delete:
 *     summary: Eliminar un administrador
 *     tags: [Administradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: administradore eliminado
 *       404:
 *         description: administradore no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete('/:id', authMiddleware, AdministradorController.eliminar);

module.exports = router;
