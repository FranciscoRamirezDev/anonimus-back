# 🗄️ Configuración de Base de Datos - AWS RDS

## Detalles de Conexión

```
Servidor: anonimusdb.cp8e88gq66wz.us-east-2.rds.amazonaws.com
Puerto: 3306
Base de Datos: anonimus
Usuario: admin
Contraseña: b8qaCtQX5nfOI7V3kQcc
Dialectó: MySQL 8.0
```

## 📁 Archivos Configurados

### 1. `.env` - Variables de Entorno
✅ Actualizado con credenciales de AWS RDS
- DB_HOST: anonimusdb.cp8e88gq66wz.us-east-2.rds.amazonaws.com
- DB_PORT: 3306
- DB_NAME: anonimus
- DB_USER: admin
- DB_PASSWORD: ••••••••••
- DB_DIALECT: mysql

### 2. `src/config/env.js`
✅ Exporta todas las variables de entorno necesarias
✅ Incluye nueva variable DB_DIALECT

### 3. `src/config/db.js`
✅ Configuración mejorada de Sequelize
✅ Pool de conexiones optimizado
✅ Soporte para SSL de AWS
✅ Validación automática de conexión al iniciar
✅ Sincronización de modelos en desarrollo

### 4. `src/app.js`
✅ Importa y sincroniza la conexión a BD
✅ Endpoint `/health` para verificar estado del servidor
✅ Sincronización automática de modelos

### 5. Modelos Sequelize

#### `src/models/User.js`
- id (UUID)
- email (único)
- password (hasheada)
- name
- isActive
- role (user/admin/moderator)
- timestamps

#### `src/models/Task.js`
- id (UUID)
- title
- description
- status (pending/in_progress/completed/cancelled)
- priority (low/medium/high/critical)
- dueDate
- userId (FK → User)
- timestamps

#### `src/models/Course.js`
- id (UUID)
- title
- description
- instructor
- level (beginner/intermediate/advanced)
- duration (en horas)
- isActive
- timestamps

### 6. `src/models/index.js`
✅ Centraliza todas las relaciones entre modelos

### 7. `docker-compose.yml`
✅ Configuración mejorada
✅ Red personalizada
✅ Health check para MySQL
✅ Sincronización de variables de entorno

## 🚀 Pasos Siguientes

1. **Instalar dependencias** (si no lo has hecho):
   ```bash
   npm install
   ```

2. **Probar la conexión**:
   ```bash
   npm run dev
   ```
   Deberías ver:
   ```
   ✅ Conexión a BD establecida correctamente
   ✅ Modelos sincronizados con la BD
   Server running on port 3000
   ```

3. **Implementar servicios**:
   - [ ] auth.service.js (register, login, logout)
   - [ ] users.service.js (CRUD)
   - [ ] tasks.service.js (CRUD)

4. **Agregar Repositorios** (opcional):
   - Implementar patrón repository para abstracción de BD

## ⚠️ Notas Importantes

- La conexión SSL está configurada pero deshabilitada por defecto (comentada)
- En producción, cambiar `JWT_SECRET` a un valor seguro
- En producción, cambiar `NODE_ENV` a `production`
- El usuario `admin` de MySQL está disponible localmente para desarrollo

## 🔗 Endpoints Disponibles

- `GET /health` - Verificar estado del servidor
- `POST /api/v1/auth/register` - Registrar usuario
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/users` - Listar usuarios (requiere auth)
- `GET /api/v1/users/:id` - Obtener usuario (requiere auth)
- `GET /api/v1/tasks` - Listar tareas (requiere auth)
- `POST /api/v1/tasks` - Crear tarea (requiere auth)
