# 🧪 Ejemplos de Uso - API Endpoints

## Tabla de Contenidos
- [Autenticación](#autenticación)
- [Usuarios](#usuarios)
- [Comunidades](#comunidades)
- [Publicaciones](#publicaciones)
- [Comentarios](#comentarios)
- [Reacciones](#reacciones)
- [Retos](#retos)
- [Notificaciones](#notificaciones)
- [Administradores](#administradores)
- [Reportes](#reportes)

## Autenticación

Todos los endpoints (excepto algunos POST) requieren un token JWT:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Usuarios

### ✅ Crear Usuario
```bash
curl -X POST http://localhost:3000/api/v1/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "alias": "juan_dev",
    "password_hash": "password123",
    "avatar_url": "https://example.com/avatar.jpg"
  }'
```

**Respuesta:**
```json
{
  "id_usuario": "550e8400-e29b-41d4-a716-446655440000",
  "alias": "juan_dev",
  "password_hash": "password123",
  "avatar_url": "https://example.com/avatar.jpg",
  "fecha_registro": "2026-05-18T10:30:00.000Z"
}
```

---

### ✅ Obtener Todos los Usuarios (Paginado)
```bash
curl -X GET "http://localhost:3000/api/v1/usuarios?limit=10&offset=0" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Respuesta:**
```json
{
  "total": 25,
  "usuarios": [
    {
      "id_usuario": "550e8400-e29b-41d4-a716-446655440000",
      "alias": "juan_dev",
      "avatar_url": "https://example.com/avatar.jpg",
      "fecha_registro": "2026-05-18T10:30:00.000Z"
    }
  ]
}
```

---

### ✅ Obtener Usuario por ID
```bash
curl -X GET http://localhost:3000/api/v1/usuarios/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### ✅ Actualizar Usuario
```bash
curl -X PUT http://localhost:3000/api/v1/usuarios/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "alias": "juan_dev_updated",
    "avatar_url": "https://example.com/new-avatar.jpg"
  }'
```

---

### ✅ Eliminar Usuario
```bash
curl -X DELETE http://localhost:3000/api/v1/usuarios/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Respuesta:**
```json
{
  "mensaje": "Usuario eliminado"
}
```

---

## Comunidades

### ✅ Crear Comunidad
```bash
curl -X POST http://localhost:3000/api/v1/comunidades \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "nombre": "Desarrolladores Web",
    "categoria": "Tecnología"
  }'
```

---

### ✅ Obtener Todas las Comunidades
```bash
curl -X GET "http://localhost:3000/api/v1/comunidades?limit=10&offset=0" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Respuesta:**
```json
{
  "total": 10,
  "comunidades": [
    {
      "id_comunidad": "660e8400-e29b-41d4-a716-446655440001",
      "nombre": "Desarrolladores Web",
      "categoria": "Tecnología"
    }
  ]
}
```

---

### ✅ Obtener Comunidad por ID
```bash
curl -X GET http://localhost:3000/api/v1/comunidades/660e8400-e29b-41d4-a716-446655440001 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### ✅ Actualizar Comunidad
```bash
curl -X PUT http://localhost:3000/api/v1/comunidades/660e8400-e29b-41d4-a716-446655440001 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "nombre": "Desarrolladores Full Stack",
    "categoria": "Tecnología Avanzada"
  }'
```

---

### ✅ Eliminar Comunidad
```bash
curl -X DELETE http://localhost:3000/api/v1/comunidades/660e8400-e29b-41d4-a716-446655440001 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Publicaciones

### ✅ Crear Publicación
```bash
curl -X POST http://localhost:3000/api/v1/publicaciones \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "id_usuario": "550e8400-e29b-41d4-a716-446655440000",
    "id_comunidad": "660e8400-e29b-41d4-a716-446655440001",
    "contenido": "¡Hola comunidad! Este es mi primer post.",
    "es_valida": true
  }'
```

**Respuesta:**
```json
{
  "id_publicacion": "770e8400-e29b-41d4-a716-446655440002",
  "id_usuario": "550e8400-e29b-41d4-a716-446655440000",
  "id_comunidad": "660e8400-e29b-41d4-a716-446655440001",
  "contenido": "¡Hola comunidad! Este es mi primer post.",
  "fecha_pub": "2026-05-18T11:00:00.000Z",
  "es_valida": true
}
```

---

### ✅ Obtener Todas las Publicaciones
```bash
curl -X GET "http://localhost:3000/api/v1/publicaciones?limit=10&offset=0" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Comentarios

### ✅ Crear Comentario
```bash
curl -X POST http://localhost:3000/api/v1/comentarios \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "id_publicacion": "770e8400-e29b-41d4-a716-446655440002",
    "id_usuario": "550e8400-e29b-41d4-a716-446655440000",
    "texto": "¡Excelente post! Totalmente de acuerdo."
  }'
```

---

## Reacciones

### ✅ Crear Reacción
```bash
curl -X POST http://localhost:3000/api/v1/reacciones \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "id_publicacion": "770e8400-e29b-41d4-a716-446655440002",
    "tipo_reaccion": "like"
  }'
```

**Tipos de reacción válidos:**
- `like`
- `love`
- `haha`
- `wow`
- `sad`
- `angry`

---

## Retos

### ✅ Crear Reto
```bash
curl -X POST http://localhost:3000/api/v1/retos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "id_usuario": "550e8400-e29b-41d4-a716-446655440000",
    "titulo": "Aprender Node.js",
    "progreso_pct": 50
  }'
```

---

### ✅ Actualizar Progreso del Reto
```bash
curl -X PUT http://localhost:3000/api/v1/retos/880e8400-e29b-41d4-a716-446655440003 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "progreso_pct": 75
  }'
```

---

## Notificaciones

### ✅ Crear Notificación
```bash
curl -X POST http://localhost:3000/api/v1/notificaciones \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "id_usuario": "550e8400-e29b-41d4-a716-446655440000",
    "mensaje": "Alguien respondió tu comentario"
  }'
```

---

### ✅ Obtener Notificaciones del Usuario
```bash
curl -X GET "http://localhost:3000/api/v1/notificaciones?limit=20&offset=0" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Administradores

### ✅ Crear Administrador
```bash
curl -X POST http://localhost:3000/api/v1/administradores \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "credenciales": "admin_secret_password_hash"
  }'
```

---

## Reportes

### ✅ Crear Reporte
```bash
curl -X POST http://localhost:3000/api/v1/reportes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "id_publicacion": "770e8400-e29b-41d4-a716-446655440002",
    "id_admin": "990e8400-e29b-41d4-a716-446655440004",
    "estado": "pendiente"
  }'
```

**Estados válidos:**
- `pendiente`
- `revisado`
- `aprobado`
- `rechazado`

---

### ✅ Actualizar Estado del Reporte
```bash
curl -X PUT http://localhost:3000/api/v1/reportes/aa0e8400-e29b-41d4-a716-446655440005 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "estado": "aprobado"
  }'
```

---

## Códigos de Respuesta HTTP

| Código | Significado |
|--------|------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Token no válido o no proporcionado |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## Manejo de Errores

Las respuestas de error siguen este formato:

```json
{
  "message": "Descripción del error",
  "status": 400
}
```

---

## Notas Importantes

- ✅ Todos los IDs son UUIDs
- ✅ Las fechas se devuelven en formato ISO 8601
- ✅ Las contraseñas NO se devuelven en respuestas de lectura
- ✅ Las eliminaciones en cascada eliminarán datos relacionados
- ✅ La paginación usa `limit` y `offset`
- ✅ Los timestamps se actualizan automáticamente

---

¡Listo para probar! 🚀
