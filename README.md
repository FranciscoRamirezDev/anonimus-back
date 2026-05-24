# Anonimus - API REST (Backend)

API REST para **Anonimus**, una red social anonima donde los usuarios pueden participar en comunidades, crear publicaciones, reaccionar, comentar y completar retos, todo sin revelar su identidad real. El sistema incluye moderacion mediante administradores y reportes.

## Tecnologias utilizadas

| Categoria | Tecnologia | Version |
|---|---|---|
| Runtime | Node.js | 22.x |
| Framework | Express | 5.x |
| ORM | Sequelize | 6.x |
| Base de datos | MySQL | 8.0 |
| Autenticacion | JWT (jsonwebtoken) | 9.x |
| Encriptacion | bcrypt | 6.x |
| Validacion | express-validator | 7.x |
| Documentacion | Swagger (swagger-jsdoc + swagger-ui-express) | 6.x / 5.x |
| Seguridad | Helmet + CORS | 8.x / 2.x |
| Logging | Morgan | 1.x |
| Testing | Jest | 30.x |
| Linter | ESLint | 10.x |
| CI/CD | GitHub Actions | - |
| Deploy | Render | - |
| Contenedores | Docker + Docker Compose | - |

## Arquitectura general

El proyecto sigue una arquitectura **modular por capas** (Router -> Controller -> Service -> Model):

```
src/
├── server.js                    # Entry point - levanta el servidor
├── app.js                       # Configuracion de Express (middlewares, rutas, Swagger)
├── config/
│   ├── db.js                    # Conexion Sequelize (MySQL, pool, SSL)
│   ├── env.js                   # Variables de entorno centralizadas
│   └── swagger.js               # Configuracion OpenAPI 3.0
├── middlewares/
│   ├── auth.js                  # Autenticacion JWT (Bearer token)
│   ├── errorHandler.js          # Manejo global de errores
│   └── validate.js              # Validacion con express-validator
├── models/
│   ├── index.js                 # Registro de modelos y relaciones
│   ├── Usuario.js               # tb_usuarios
│   ├── Comunidad.js             # tb_comunidades
│   ├── Publicacion.js           # tb_publicaciones
│   ├── Comentario.js            # tb_comentarios
│   ├── Reaccion.js              # tb_reacciones
│   ├── Reto.js                  # tb_retos
│   ├── Notificacion.js          # tb_notificaciones
│   ├── Administrador.js         # tb_administradores
│   └── Reporte.js               # tb_reportes
└── modules/
    ├── auth/                    # Registro y login
    ├── usuarios/                # CRUD de usuarios
    ├── comunidades/             # CRUD de comunidades
    ├── publicaciones/           # CRUD de publicaciones
    ├── comentarios/             # CRUD de comentarios
    ├── reacciones/              # CRUD de reacciones
    ├── retos/                   # CRUD de retos
    ├── notificaciones/          # CRUD de notificaciones
    ├── administradores/         # CRUD de administradores
    └── reportes/                # CRUD de reportes
```

### Modelo de datos (relaciones)

```
Usuario 1:N --> Publicaciones, Comentarios, Retos, Notificaciones
Comunidad 1:N --> Publicaciones
Publicacion 1:N --> Comentarios, Reacciones, Reportes
Administrador 1:N --> Reportes
```

### Endpoints de la API

Todos los endpoints estan bajo el prefijo `/api/v1/`:

| Modulo | Ruta base | Autenticacion |
|---|---|---|
| Auth | `/auth` (register, login) | No |
| Usuarios | `/usuarios` | Si (excepto crear) |
| Comunidades | `/comunidades` | Si |
| Publicaciones | `/publicaciones` | Si |
| Comentarios | `/comentarios` | Si |
| Reacciones | `/reacciones` | Si |
| Retos | `/retos` | Si |
| Notificaciones | `/notificaciones` | Si |
| Administradores | `/administradores` | Si |
| Reportes | `/reportes` | Si |

### CI/CD

```
Push a develop          PR develop -> main         Merge a main
      |                        |                        |
      v                        v                        v
  CI Pipeline              CI Pipeline             CD Pipeline
  (lint, test,             (lint, test,            (deploy a Render)
   docker build)            docker build)
```

## Guia de instalacion

### Prerrequisitos

- **Node.js** >= 22.x
- **npm** >= 10.x
- **MySQL** 8.0 (local o remoto)
- **Docker** y **Docker Compose** (opcional, para levantar con contenedores)

### 1. Clonar el repositorio

```bash
git clone https://github.com/FranciscoRamirezDev/anonimus-back.git
cd anonimus-back
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raiz del proyecto:

```env
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=3306
DB_NAME=anonimus_db
DB_USER=root
DB_PASSWORD=tu_password
DB_DIALECT=mysql

JWT_SECRET=tu_secreto_jwt
```

### 4. Crear la base de datos

Crear la base de datos en MySQL:

```sql
CREATE DATABASE anonimus_db;
```

Las tablas se crean automaticamente al iniciar el servidor gracias a `sequelize.sync()`.

## Ejecutar el proyecto localmente

### Modo desarrollo (con hot-reload)

```bash
npm run dev
```

### Modo produccion

```bash
npm start
```

El servidor estara disponible en `http://localhost:3000`.

### Con Docker Compose

```bash
docker-compose up
```

Esto levanta la API en el puerto `3000` y MySQL en el puerto `3306`.

## Documentacion de la API

Una vez el servidor este corriendo, la documentacion interactiva de Swagger esta disponible en:

```
http://localhost:3000/api-docs
```

### Health check

```
GET http://localhost:3000/health
```

## Scripts disponibles

| Comando | Descripcion |
|---|---|
| `npm start` | Inicia el servidor en produccion |
| `npm run dev` | Inicia con nodemon (hot-reload) |
| `npm run lint` | Ejecuta ESLint sobre `src/` |
| `npm test` | Ejecuta los tests con Jest |
| `npm run test:coverage` | Ejecuta tests con reporte de cobertura |
| `npm run seed:retos` | Ejecuta el seeder de retos |

## Testing

El proyecto cuenta con **177 tests unitarios** con una cobertura superior al **92%**:

```bash
npm run test:coverage
```

Los tests cubren:
- Middlewares (auth, errorHandler, validate)
- Services (logica de negocio de los 10 modulos)
- Controllers (manejo de request/response de los 10 modulos)
- Configuracion (variables de entorno)
