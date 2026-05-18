# 📚 Documentación Swagger - Anonimus API

## ✅ Implementación Completada

### 🎯 ¿Qué es Swagger?

Swagger (ahora OpenAPI) es una especificación para describir APIs REST de manera estandarizada. Permite:
- 📖 Documentación interactiva automática
- 🧪 Probar endpoints sin herramientas externas
- 🔗 Compartir especificaciones con otros desarrolladores
- 📱 Generar clientes en múltiples lenguajes

---

## 🚀 Acceder a la Documentación

### URL Principal
```
http://localhost:3000/api-docs
```

### Endpoint del JSON
```
http://localhost:3000/swagger.json
```

---

## 📁 Archivos Generados

### Configuración
```
src/config/swagger.js
├── Define metadatos generales de la API
├── Esquemas de objetos (Usuario, Comunidad, etc.)
├── Esquemas de seguridad (Bearer Token)
└── Servidores (desarrollo y producción)
```

### Routers Documentados
```
src/modules/
├── usuarios/usuarios.router.js           ✅ Documentado
├── comunidades/comunidades.router.js     ✅ Documentado
├── publicaciones/publicaciones.router.js ✅ Documentado
├── comentarios/comentarios.router.js     ✅ Documentado
├── reacciones/reacciones.router.js       ✅ Documentado
├── retos/retos.router.js                 ✅ Documentado
├── notificaciones/notificaciones.router.js ✅ Documentado
├── administradores/administradores.router.js ✅ Documentado
└── reportes/reportes.router.js           ✅ Documentado
```

---

## 📝 Estructura de Documentación Swagger

### Comentarios JSDoc en Routers

```javascript
/**
 * @swagger
 * /api/v1/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', UsuarioController.crear);
```

### Componentes
- **@swagger**: Marca inicio de documentación
- **summary**: Descripción breve del endpoint
- **tags**: Categoría del endpoint
- **requestBody**: Estructura de datos de entrada
- **responses**: Respuestas posibles (200, 201, 400, 401, 404, 500)
- **parameters**: Parámetros en query, path o headers

---

## 🔐 Seguridad en Swagger

### Token Bearer
La mayoría de endpoints requieren autenticación JWT:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Configurar Token en Swagger UI
1. Haz clic en el botón **"Authorize"** (candado) en la parte superior
2. Ingresa tu token JWT sin la palabra "Bearer"
3. Los requests posteriores lo incluirán automáticamente

---

## 🧪 Probar Endpoints en Swagger UI

### Paso 1: Autorización (si es necesario)
1. Clic en **"Authorize"** (parte superior derecha)
2. Ingresa tu token
3. Clic en **"Authorize"** y luego **"Close"**

### Paso 2: Expandir Endpoint
1. Busca el endpoint que deseas probar
2. Clic en él para expandir

### Paso 3: Completar Datos
1. Ingresa valores en campos requeridos
2. Para POST/PUT: completa el Body JSON

### Paso 4: Ejecutar
1. Clic en **"Try it out"**
2. Clic en **"Execute"**
3. Revisa Response y Status Code

---

## 📊 Ejemplos de Documentación

### GET (Listar con Paginación)
```yaml
/api/v1/usuarios:
  get:
    summary: Listar todos los usuarios (paginado)
    tags: [Usuarios]
    parameters:
      - in: query
        name: limit
        schema:
          type: integer
          default: 10
      - in: query
        name: offset
        schema:
          type: integer
          default: 0
    responses:
      200:
        description: Lista de usuarios
```

### POST (Crear)
```yaml
/api/v1/usuarios:
  post:
    summary: Crear un nuevo usuario
    tags: [Usuarios]
    security: []  # No requiere autenticación
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            required:
              - alias
              - password_hash
            properties:
              alias:
                type: string
                example: juan_dev
              password_hash:
                type: string
                example: password123
    responses:
      201:
        description: Usuario creado exitosamente
```

### GET by ID
```yaml
/api/v1/usuarios/{id}:
  get:
    summary: Obtener un usuario por ID
    tags: [Usuarios]
    parameters:
      - in: path
        name: id
        required: true
        schema:
          type: string
          format: uuid
    responses:
      200:
        description: Usuario encontrado
      404:
        description: Usuario no encontrado
```

### PUT (Actualizar)
```yaml
/api/v1/usuarios/{id}:
  put:
    summary: Actualizar un usuario
    tags: [Usuarios]
    parameters:
      - in: path
        name: id
        required: true
        schema:
          type: string
          format: uuid
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
    responses:
      200:
        description: Usuario actualizado
```

### DELETE
```yaml
/api/v1/usuarios/{id}:
  delete:
    summary: Eliminar un usuario
    tags: [Usuarios]
    parameters:
      - in: path
        name: id
        required: true
        schema:
          type: string
          format: uuid
    responses:
      200:
        description: Usuario eliminado
```

---

## 🎯 Métodos HTTP Documentados

| Método | Operación | Descripción |
|--------|-----------|-------------|
| **GET** | READ | Obtener datos |
| **POST** | CREATE | Crear nuevo recurso |
| **PUT** | UPDATE | Actualizar recurso completo |
| **PATCH** | PARTIAL UPDATE | Actualizar parcialmente |
| **DELETE** | DELETE | Eliminar recurso |

---

## 📋 Códigos de Respuesta

| Código | Significado | Ejemplo |
|--------|-------------|---------|
| **200** | OK | GET exitoso |
| **201** | Created | POST exitoso |
| **204** | No Content | DELETE exitoso |
| **400** | Bad Request | Datos inválidos |
| **401** | Unauthorized | Token no válido |
| **403** | Forbidden | Sin permisos |
| **404** | Not Found | Recurso no existe |
| **500** | Server Error | Error del servidor |

---

## 🔍 Esquemas Documentados

### Usuario
```json
{
  "id_usuario": "uuid",
  "alias": "string (3-50 chars)",
  "password_hash": "string",
  "avatar_url": "url (optional)",
  "fecha_registro": "datetime"
}
```

### Comunidad
```json
{
  "id_comunidad": "uuid",
  "nombre": "string (3-100 chars)",
  "categoria": "string (50 chars)"
}
```

### Publicacion
```json
{
  "id_publicacion": "uuid",
  "id_usuario": "uuid",
  "id_comunidad": "uuid",
  "contenido": "string",
  "fecha_pub": "datetime",
  "es_valida": "boolean"
}
```

---

## 🛠️ Integración con Herramientas

### Postman
1. Ir a File → Import
2. Pegar URL: `http://localhost:3000/swagger.json`
3. Importar como colección

### VS Code - Thunder Client
1. Instalar extensión "Thunder Client"
2. File → Import cURL/OpenAPI
3. Pegar URL de Swagger JSON

### cURL desde Terminal
```bash
curl -X GET http://localhost:3000/api/v1/usuarios \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📖 Recursos Útiles

- [OpenAPI 3.0 Spec](https://spec.openapis.org/oas/v3.0.3)
- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)
- [swagger-jsdoc GitHub](https://github.com/Surnet/swagger-jsdoc)

---

## ✅ Checklist de Documentación

- ✅ Swagger UI servido en `/api-docs`
- ✅ JSON de especificación en `/swagger.json`
- ✅ Todos los endpoints documentados
- ✅ Esquemas de objetos definidos
- ✅ Seguridad con Bearer Token configurada
- ✅ Ejemplos de requests/responses
- ✅ Códigos de respuesta documentados
- ✅ Paginación explicada
- ✅ Errores listados

---

## 🚀 Próximos Pasos

1. **Iniciar servidor**: `npm run dev`
2. **Acceder a Swagger**: http://localhost:3000/api-docs
3. **Obtener token**: Login o crear usuario
4. **Probar endpoints**: Click en "Authorize" y luego "Try it out"
5. **Integrar en proyecto**: Usar especificación con clientes frontend

---

## 📝 Ejemplo: Crear Usuario

### En Swagger UI
1. Expandir "POST /api/v1/usuarios"
2. Click "Try it out"
3. Ingresa:
```json
{
  "alias": "juan_dev",
  "password_hash": "password123",
  "avatar_url": "https://example.com/avatar.jpg"
}
```
4. Click "Execute"
5. Verifica la respuesta 201

---

## 🎉 ¡Todo Listo!

La documentación Swagger está completamente implementada y lista para usar.

Accede a **http://localhost:3000/api-docs** en tu navegador. 🚀
