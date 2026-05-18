#!/usr/bin/env python3
"""
Script para generar todos los CRUDs automáticamente
"""

import os
import sys

BASE_PATH = "/Users/franciscoramirez/Desktop/ESTUDIO/UNIVERSIDAD-IBEROAMERICANA/SEMESTRE 7/PROYECTO DE SOFTWARE/ANONIMUS/anonimus-back/src/modules"

MODULES = {
    "comunidades": {
        "model": "Comunidad",
        "model_file": "Comunidad",
        "singular": "comunidad",
        "plural": "comunidades",
    },
    "publicaciones": {
        "model": "Publicacion",
        "model_file": "Publicacion",
        "singular": "publicacion",
        "plural": "publicaciones",
    },
    "comentarios": {
        "model": "Comentario",
        "model_file": "Comentario",
        "singular": "comentario",
        "plural": "comentarios",
    },
    "reacciones": {
        "model": "Reaccion",
        "model_file": "Reaccion",
        "singular": "reaccion",
        "plural": "reacciones",
    },
    "retos": {
        "model": "Reto",
        "model_file": "Reto",
        "singular": "reto",
        "plural": "retos",
    },
    "notificaciones": {
        "model": "Notificacion",
        "model_file": "Notificacion",
        "singular": "notificacion",
        "plural": "notificaciones",
    },
    "administradores": {
        "model": "Administrador",
        "model_file": "Administrador",
        "singular": "administrador",
        "plural": "administradores",
    },
    "reportes": {
        "model": "Reporte",
        "model_file": "Reporte",
        "singular": "reporte",
        "plural": "reportes",
    },
}

SERVICE_TEMPLATE = """const {{ {model} }} = require('../../models');

class {Model}Service {{
  static async crear(data) {{
    return await {model}.create(data);
  }}

  static async obtenerTodos(limit = 10, offset = 0) {{
    const {{ count, rows }} = await {model}.findAndCountAll({{
      limit,
      offset,
    }});
    return {{ total: count, {plural}: rows }};
  }}

  static async obtenerPorId(id) {{
    const {singular} = await {model}.findByPk(id);
    if (!{singular}) throw new Error('{Model} no encontrado');
    return {singular};
  }}

  static async actualizar(id, data) {{
    const {singular} = await {model}.findByPk(id);
    if (!{singular}) throw new Error('{Model} no encontrado');
    return await {singular}.update(data);
  }}

  static async eliminar(id) {{
    const {singular} = await {model}.findByPk(id);
    if (!{singular}) throw new Error('{Model} no encontrado');
    await {singular}.destroy();
    return {{ mensaje: '{Model} eliminado' }};
  }}
}}

module.exports = {Model}Service;
"""

CONTROLLER_TEMPLATE = """const {Model}Service = require('./{plural}.service');

class {Model}Controller {{
  static async crear(req, res, next) {{
    try {{
      const {singular} = await {Model}Service.crear(req.body);
      res.status(201).json({singular});
    }} catch (error) {{
      next(error);
    }}
  }}

  static async obtenerTodos(req, res, next) {{
    try {{
      const {{ limit = 10, offset = 0 }} = req.query;
      const resultado = await {Model}Service.obtenerTodos(limit, offset);
      res.json(resultado);
    }} catch (error) {{
      next(error);
    }}
  }}

  static async obtenerPorId(req, res, next) {{
    try {{
      const {singular} = await {Model}Service.obtenerPorId(req.params.id);
      res.json({singular});
    }} catch (error) {{
      next(error);
    }}
  }}

  static async actualizar(req, res, next) {{
    try {{
      const {singular} = await {Model}Service.actualizar(req.params.id, req.body);
      res.json({singular});
    }} catch (error) {{
      next(error);
    }}
  }}

  static async eliminar(req, res, next) {{
    try {{
      const resultado = await {Model}Service.eliminar(req.params.id);
      res.json(resultado);
    }} catch (error) {{
      next(error);
    }}
  }}
}}

module.exports = {Model}Controller;
"""

ROUTER_TEMPLATE = """const {{ Router }} = require('express');
const {Model}Controller = require('./{plural}.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

router.post('/', authMiddleware, {Model}Controller.crear);
router.get('/', authMiddleware, {Model}Controller.obtenerTodos);
router.get('/:id', authMiddleware, {Model}Controller.obtenerPorId);
router.put('/:id', authMiddleware, {Model}Controller.actualizar);
router.delete('/:id', authMiddleware, {Model}Controller.eliminar);

module.exports = router;
"""

def generate_crud(module_name, config):
    """Genera los archivos CRUD para un módulo"""
    module_path = os.path.join(BASE_PATH, module_name)
    
    # Reemplazar placeholders
    service_code = SERVICE_TEMPLATE.format(
        model=config["model"],
        Model=config["model"],
        singular=config["singular"],
        plural=config["plural"],
    )
    
    controller_code = CONTROLLER_TEMPLATE.format(
        model=config["model"],
        Model=config["model"],
        singular=config["singular"],
        plural=config["plural"],
    )
    
    router_code = ROUTER_TEMPLATE.format(
        model=config["model"],
        Model=config["model"],
        singular=config["singular"],
        plural=config["plural"],
    )
    
    # Escribir archivos
    with open(os.path.join(module_path, f"{module_name}.service.js"), 'w') as f:
        f.write(service_code)
    
    with open(os.path.join(module_path, f"{module_name}.controller.js"), 'w') as f:
        f.write(controller_code)
    
    with open(os.path.join(module_path, f"{module_name}.router.js"), 'w') as f:
        f.write(router_code)
    
    print(f"✅ {module_name}: Service, Controller y Router creados")

def main():
    print("🚀 Generando CRUD para todos los módulos...\n")
    
    for module_name, config in MODULES.items():
        try:
            generate_crud(module_name, config)
        except Exception as e:
            print(f"❌ Error en {module_name}: {e}")
    
    print("\n✨ ¡CRUD completamente generado!")

if __name__ == "__main__":
    main()
