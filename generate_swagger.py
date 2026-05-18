#!/usr/bin/env python3
"""
Script para generar documentación Swagger en todos los routers
"""

import os

BASE_PATH = "/Users/franciscoramirez/Desktop/ESTUDIO/UNIVERSIDAD-IBEROAMERICANA/SEMESTRE 7/PROYECTO DE SOFTWARE/ANONIMUS/anonimus-back/src/modules"

MODULES = {
    "comunidades": {
        "tag": "Comunidades",
        "description": "Gestión de comunidades",
        "entity": "Comunidad",
    },
    "publicaciones": {
        "tag": "Publicaciones",
        "description": "Gestión de publicaciones",
        "entity": "Publicacion",
    },
    "comentarios": {
        "tag": "Comentarios",
        "description": "Gestión de comentarios",
        "entity": "Comentario",
    },
    "reacciones": {
        "tag": "Reacciones",
        "description": "Gestión de reacciones",
        "entity": "Reaccion",
    },
    "retos": {
        "tag": "Retos",
        "description": "Gestión de retos/desafíos",
        "entity": "Reto",
    },
    "notificaciones": {
        "tag": "Notificaciones",
        "description": "Gestión de notificaciones",
        "entity": "Notificacion",
    },
    "administradores": {
        "tag": "Administradores",
        "description": "Gestión de administradores",
        "entity": "Administrador",
    },
    "reportes": {
        "tag": "Reportes",
        "description": "Gestión de reportes",
        "entity": "Reporte",
    },
}

ROUTER_TEMPLATE = """const {{ Router }} = require('express');
const {Controller}Controller = require('./{plural}.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: {Tag}
 *     description: {Description}
 */

/**
 * @swagger
 * /api/v1/{plural}:
 *   post:
 *     summary: Crear un nuevo {singular}
 *     tags: [{Tag}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nombre: "Ejemplo de {singular}"
 *     responses:
 *       201:
 *         description: {singular} creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/', authMiddleware, {Controller}Controller.crear);

/**
 * @swagger
 * /api/v1/{plural}:
 *   get:
 *     summary: Listar todos los {plural} (paginado)
 *     tags: [{Tag}]
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
 *         description: Lista de {plural}
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 {plural}:
 *                   type: array
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, {Controller}Controller.obtenerTodos);

/**
 * @swagger
 * /api/v1/{plural}/{{id}}:
 *   get:
 *     summary: Obtener un {singular} por ID
 *     tags: [{Tag}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del {singular}
 *     responses:
 *       200:
 *         description: {singular} encontrado
 *       404:
 *         description: {singular} no encontrado
 *       401:
 *         description: No autorizado
 */
router.get('/:id', authMiddleware, {Controller}Controller.obtenerPorId);

/**
 * @swagger
 * /api/v1/{plural}/{{id}}:
 *   put:
 *     summary: Actualizar un {singular}
 *     tags: [{Tag}]
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
 *         description: {singular} actualizado
 *       404:
 *         description: {singular} no encontrado
 *       401:
 *         description: No autorizado
 */
router.put('/:id', authMiddleware, {Controller}Controller.actualizar);

/**
 * @swagger
 * /api/v1/{plural}/{{id}}:
 *   delete:
 *     summary: Eliminar un {singular}
 *     tags: [{Tag}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: {singular} eliminado
 *       404:
 *         description: {singular} no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete('/:id', authMiddleware, {Controller}Controller.eliminar);

module.exports = router;
"""

def generate_swagger_router(module_name, config):
    """Genera router con documentación Swagger"""
    module_path = os.path.join(BASE_PATH, module_name)
    
    # Reemplazar placeholders
    router_code = ROUTER_TEMPLATE.format(
        Controller=config["entity"],
        Tag=config["tag"],
        Description=config["description"],
        plural=module_name,
        singular=module_name.rstrip('s'),  # Elimina la 's' final
    )
    
    # Escribir archivo
    with open(os.path.join(module_path, f"{module_name}.router.js"), 'w') as f:
        f.write(router_code)
    
    print(f"✅ {module_name}: Router con Swagger creado")

def main():
    print("🚀 Generando documentación Swagger en todos los routers...\n")
    
    # Usuarios ya está hecho manualmente
    print("⏭️  Usuarios ya fue actualizado manualmente\n")
    
    for module_name, config in MODULES.items():
        try:
            generate_swagger_router(module_name, config)
        except Exception as e:
            print(f"❌ Error en {module_name}: {e}")
    
    print("\n✨ ¡Documentación Swagger generada!")

if __name__ == "__main__":
    main()
