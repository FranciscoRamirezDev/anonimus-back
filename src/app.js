const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

// Importar la conexión a BD
const sequelize = require('./config/db');

// Importar configuración de Swagger
const swaggerSpec = require('./config/swagger');

const app = express();

// — MIDDLEWARES —
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL?.split(',').map(u => u.trim()) || [],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(morgan('dev'));

// — SWAGGER DOCUMENTATION —
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    url: '/swagger.json',
  },
  customCss: '.swagger-ui .topbar { display: none }',
}));

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// — ROUTES —
app.use('/api/v1/auth', require('./modules/auth/auth.router'));
app.use('/api/v1/usuarios', require('./modules/usuarios/usuarios.router'));
app.use('/api/v1/comunidades', require('./modules/comunidades/comunidades.router'));
app.use('/api/v1/publicaciones', require('./modules/publicaciones/publicaciones.router'));
app.use('/api/v1/comentarios', require('./modules/comentarios/comentarios.router'));
app.use('/api/v1/reacciones', require('./modules/reacciones/reacciones.router'));
app.use('/api/v1/retos', require('./modules/retos/retos.router'));
app.use('/api/v1/notificaciones', require('./modules/notificaciones/notificaciones.router'));
app.use('/api/v1/administradores', require('./modules/administradores/administradores.router'));
app.use('/api/v1/reportes', require('./modules/reportes/reportes.router'));

// — HEALTH CHECK —
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor activo' });
});

// — DATABASE SYNC —
sequelize.sync({ alter: process.env.NODE_ENV === 'development' })
  .then(() => {
    console.log('✅ Modelos sincronizados con la BD');
  })
  .catch((err) => {
    console.error('❌ Error al sincronizar modelos:', err);
  });

// — ERROR HANDLER —
app.use(require('./middlewares/errorHandler'));

module.exports = app;
