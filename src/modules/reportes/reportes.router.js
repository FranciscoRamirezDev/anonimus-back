const { Router } = require('express');
const ReporteController = require('./reportes.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Reportes
 *     description: Gestión de reportes
 */

/**
 * @swagger
 * /api/v1/reportes:
 *   post:
 *     summary: Crear un nuevo reporte
 *     tags: [Reportes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nombre: "Ejemplo de reporte"
 *     responses:
 *       201:
 *         description: reporte creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/', authMiddleware, ReporteController.crear);

/**
 * @swagger
 * /api/v1/reportes:
 *   get:
 *     summary: Listar todos los reportes (paginado)
 *     tags: [Reportes]
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
 *         description: Lista de reportes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 reportes:
 *                   type: array
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, ReporteController.obtenerTodos);

/**
 * @swagger
 * /api/v1/reportes/{id}:
 *   get:
 *     summary: Obtener un reporte por ID
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del reporte
 *     responses:
 *       200:
 *         description: reporte encontrado
 *       404:
 *         description: reporte no encontrado
 *       401:
 *         description: No autorizado
 */
router.get('/:id', authMiddleware, ReporteController.obtenerPorId);

/**
 * @swagger
 * /api/v1/reportes/{id}:
 *   put:
 *     summary: Actualizar un reporte
 *     tags: [Reportes]
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
 *         description: reporte actualizado
 *       404:
 *         description: reporte no encontrado
 *       401:
 *         description: No autorizado
 */
router.put('/:id', authMiddleware, ReporteController.actualizar);

/**
 * @swagger
 * /api/v1/reportes/{id}:
 *   delete:
 *     summary: Eliminar un reporte
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: reporte eliminado
 *       404:
 *         description: reporte no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete('/:id', authMiddleware, ReporteController.eliminar);

module.exports = router;
