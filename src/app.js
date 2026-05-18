const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Importar la conexión a BD
const sequelize = require('./config/db');

const app = express();

// — MIDDLEWARES —
app.use(helmet());                              // Seguridad HTTP
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());                        // Body parser
app.use(morgan('dev'));                         // Logging

// — ROUTES —
app.use('/api/v1/auth',  require('./modules/auth/auth.router'));
app.use('/api/v1/users', require('./modules/users/users.router'));
app.use('/api/v1/tasks', require('./modules/tasks/tasks.router'));

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
