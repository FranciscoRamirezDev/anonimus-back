const { Router } = require('express');
const authController = require('./auth.controller');

const router = Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Autenticación]
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
 *                 description: Nombre de usuario único
 *                 example: juan_anónimo
 *               password_hash:
 *                 type: string
 *                 minLength: 8
 *                 description: Contraseña (será encriptada)
 *                 example: Password123!
 *               avatar_url:
 *                 type: string
 *                 format: uri
 *                 description: URL del avatar (opcional)
 *                 example: https://example.com/avatar.jpg
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id_usuario:
 *                       type: string
 *                       format: uuid
 *                     alias:
 *                       type: string
 *                     avatar_url:
 *                       type: string
 *                       nullable: true
 *                     fecha_registro:
 *                       type: string
 *                       format: date-time
 *                 token:
 *                   type: string
 *                   description: JWT token para autenticación
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: El alias ya está en uso
 *       500:
 *         description: Error del servidor
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Iniciar sesión con alias y contraseña
 *     tags: [Autenticación]
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
 *                 description: Nombre de usuario
 *                 example: juan_anónimo
 *               password_hash:
 *                 type: string
 *                 description: Contraseña
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id_usuario:
 *                       type: string
 *                       format: uuid
 *                     alias:
 *                       type: string
 *                     avatar_url:
 *                       type: string
 *                       nullable: true
 *                     fecha_registro:
 *                       type: string
 *                       format: date-time
 *                 token:
 *                   type: string
 *                   description: JWT token para autenticación
 *       400:
 *         description: Alias y contraseña requeridos
 *       401:
 *         description: Alias o contraseña incorrectos
 *       500:
 *         description: Error del servidor
 */
router.post('/login', authController.login);

module.exports = router;
