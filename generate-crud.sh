#!/bin/bash

# Este script genera todos los archivos CRUD

PROJECT_PATH="/Users/franciscoramirez/Desktop/ESTUDIO/UNIVERSIDAD-IBEROAMERICANA/SEMESTRE 7/PROYECTO DE SOFTWARE/ANONIMUS/anonimus-back/src"

echo "🚀 Generando CRUD completo para Anonimus..."

# ====== USUARIO SERVICE ======
cat > "$PROJECT_PATH/modules/usuarios/usuarios.service.js" << 'EOF'
const { Usuario } = require('../../models');

class UsuarioService {
  static async crear(data) {
    const usuario = await Usuario.create(data);
    return usuario;
  }

  static async obtenerTodos(limit = 10, offset = 0) {
    const { count, rows } = await Usuario.findAndCountAll({
      limit,
      offset,
      attributes: { exclude: ['password_hash'] },
    });
    return { total: count, usuarios: rows };
  }

  static async obtenerPorId(id) {
    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ['password_hash'] },
    });
    if (!usuario) throw new Error('Usuario no encontrado');
    return usuario;
  }

  static async obtenerPorAlias(alias) {
    return await Usuario.findOne({ where: { alias } });
  }

  static async actualizar(id, data) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuario no encontrado');
    return await usuario.update(data);
  }

  static async eliminar(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuario no encontrado');
    await usuario.destroy();
    return { mensaje: 'Usuario eliminado' };
  }
}

module.exports = UsuarioService;
EOF

echo "✅ Usuario Service creado"

# ====== USUARIO CONTROLLER ======
cat > "$PROJECT_PATH/modules/usuarios/usuarios.controller.js" << 'EOF'
const UsuarioService = require('./usuarios.service');

class UsuarioController {
  static async crear(req, res, next) {
    try {
      const usuario = await UsuarioService.crear(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerTodos(req, res, next) {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const resultado = await UsuarioService.obtenerTodos(limit, offset);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  static async obtenerPorId(req, res, next) {
    try {
      const usuario = await UsuarioService.obtenerPorId(req.params.id);
      res.json(usuario);
    } catch (error) {
      next(error);
    }
  }

  static async actualizar(req, res, next) {
    try {
      const usuario = await UsuarioService.actualizar(req.params.id, req.body);
      res.json(usuario);
    } catch (error) {
      next(error);
    }
  }

  static async eliminar(req, res, next) {
    try {
      const resultado = await UsuarioService.eliminar(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsuarioController;
EOF

echo "✅ Usuario Controller creado"

# ====== USUARIO ROUTER ======
cat > "$PROJECT_PATH/modules/usuarios/usuarios.router.js" << 'EOF'
const { Router } = require('express');
const UsuarioController = require('./usuarios.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

router.post('/', UsuarioController.crear);
router.get('/', authMiddleware, UsuarioController.obtenerTodos);
router.get('/:id', authMiddleware, UsuarioController.obtenerPorId);
router.put('/:id', authMiddleware, UsuarioController.actualizar);
router.delete('/:id', authMiddleware, UsuarioController.eliminar);

module.exports = router;
EOF

echo "✅ Usuario Router creado"

echo "✨ CRUD de Usuario completado"

