# 🔐 Guía de Prueba - Autenticación JWT

## ✅ Estado Actual

✅ **auth.service.js** - Implementado con JWT y bcrypt
✅ **auth.router.js** - Documentado con Swagger
✅ **auth.controller.js** - Listo para procesar requests
✅ **bcrypt** - Instalado para encriptación

---

## 🚀 Endpoints Disponibles

### 1. **POST /api/v1/auth/register** - Registrar usuario
- **Descripción**: Crear un nuevo usuario con alias y contraseña
- **Sin autenticación requerida**: ✅
- **Encriptación de contraseña**: ✅ bcrypt con 10 salts

### 2. **POST /api/v1/auth/login** - Iniciar sesión
- **Descripción**: Login y obtener JWT token
- **Sin autenticación requerida**: ✅
- **JWT expiration**: 24 horas

---

## 📝 Pruebas en Swagger UI

### Paso 1: Registrar usuario

1. Abre http://localhost:3000/api-docs
2. Busca **POST /api/v1/auth/register**
3. Click "Try it out"
4. Ingresa en el Body:

\`\`\`json
{
  "alias": "juan_dev",
  "password_hash": "Password123!",
  "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=juan"
}
\`\`\`

5. Click "Execute"
6. **Respuesta esperada (201)**:

\`\`\`json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id_usuario": "550e8400-e29b-41d4-a716-446655440000",
    "alias": "juan_dev",
    "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=juan",
    "fecha_registro": "2026-05-18T14:30:45.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MGU4NDAwLWUyOWItNDFkNC1hNzE2LTQ0NjY1NTQ0MDAwMCIsImFsaWFzIjoianVhbl9kZXYiLCJpYXQiOjE0NzU2MzIyMjcsImV4cCI6MTQ3NTcxODYyN30.qI3_aHieFtYtZ6rrXZBjFZRZXOqEzGTxMTKxVRbmAZk"
}
\`\`\`

### Paso 2: Copiar el token

- De la respuesta, copia el valor de \`token\`
- Úsalo en los endpoints autenticados

### Paso 3: Login con usuario existente

1. **POST /api/v1/auth/login**
2. Click "Try it out"
3. Ingresa en el Body:

\`\`\`json
{
  "alias": "juan_dev",
  "password_hash": "Password123!"
}
\`\`\`

4. Click "Execute"
5. **Respuesta esperada (200)**:

\`\`\`json
{
  "message": "Login exitoso",
  "user": {
    "id_usuario": "550e8400-e29b-41d4-a716-446655440000",
    "alias": "juan_dev",
    "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=juan",
    "fecha_registro": "2026-05-18T14:30:45.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
\`\`\`

---

## 🧪 Pruebas con cURL

### Registrar usuario

\`\`\`bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "alias": "maria_dev",
    "password_hash": "SecurePass123!",
    "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=maria"
  }'
\`\`\`

### Iniciar sesión

\`\`\`bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "alias": "maria_dev",
    "password_hash": "SecurePass123!"
  }'
\`\`\`

---

## 🔐 Usar el Token

### Con Swagger UI

1. Click en el botón **"Authorize"** (parte superior derecha)
2. En "bearerAuth (http, bearer)", ingresa solo el token (sin "Bearer")
3. Click "Authorize"
4. Los requests posteriores lo incluirán automáticamente

### Con cURL

\`\`\`bash
curl -X GET http://localhost:3000/api/v1/usuarios \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
\`\`\`

### Con Postman

1. Abre un request
2. Ir a "Authorization" tab
3. Seleccionar "Bearer Token"
4. Pega tu token en el campo "Token"

---

## 🛡️ Validaciones

### Registro
- ✅ Alias debe ser único
- ✅ Alias: 3-50 caracteres
- ✅ Contraseña: mínimo 8 caracteres
- ✅ Avatar URL: opcional (validada como URL válida)
- ✅ Contraseña se encripta con bcrypt (10 salts)
- ✅ Retorna JWT automáticamente

### Login
- ✅ Alias y contraseña requeridos
- ✅ Contraseña comparada con hash usando bcrypt
- ✅ Retorna token JWT válido por 24 horas
- ✅ Error si alias no existe
- ✅ Error si contraseña es incorrecta

---

## ✨ Endpoints que Usan Autenticación

Todos estos endpoints requieren el token JWT en el header \`Authorization: Bearer <TOKEN>\`:

- ✅ GET /api/v1/usuarios (necesita token)
- ✅ PUT /api/v1/usuarios/:id (necesita token)
- ✅ DELETE /api/v1/usuarios/:id (necesita token)
- ✅ POST /api/v1/publicaciones (necesita token)
- ✅ POST /api/v1/comentarios (necesita token)
- ✅ POST /api/v1/reacciones (necesita token)
- ✅ Y más...

---

## 🎯 Checklist

- [x] auth.service.js implementado
- [x] Bcrypt instalado
- [x] JWT generado
- [x] Documentación en Swagger
- [x] Endpoints disponibles en Swagger UI
- [ ] Probar register con múltiples usuarios
- [ ] Probar login con credenciales correctas
- [ ] Probar login con credenciales incorrectas
- [ ] Probar endpoints protegidos con token

¡Ahora ve a http://localhost:3000/api-docs y prueba el login! 🚀
