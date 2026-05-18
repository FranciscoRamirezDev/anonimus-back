const { Router } = require('express');
const UsuarioController = require('./usuarios.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Gestión de usuarios del sistema
 */

/**
 * @swagger
 * /api/v1/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - alias
 *               - password_hash
 *             properties:
 *               alias:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *                 example: juan_dev
 *               password_hash:
 *                 type: string
 *                 minLength: 8
 *                 example: password123
 *               avatar_url:
 *                 type: string
 *                 format: url
 *                 example: https://example.com/avatar.jpg
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', UsuarioController.crear);

/**
 * @swagger
 * /api/v1/usuarios:
 *   get:
 *     summary: Listar todos los usuarios (paginado)
 *     tags: [Usuarios]
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
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 usuarios:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, UsuarioController.obtenerTodos);

/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
 */
router.get('/:id', authMiddleware, UsuarioController.obtenerPorId);

/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Usuarios]
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
 *             properties:
 *               alias:
 *                 type: string
 *               avatar_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
 */
router.put('/:id', authMiddleware, UsuarioController.actualizar);

/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete('/:id', authMiddleware, UsuarioController.eliminar);

module.exports = router;
