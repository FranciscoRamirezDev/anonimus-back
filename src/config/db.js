const { Sequelize } = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: env.DB_DIALECT || 'mysql',
  logging: env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // Para AWS RDS, habilitar SSL si es necesario
  dialectOptions: {
    ...(process.env.DB_SSL && {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }),
  },
  // Timestamps automáticos
  timestamps: true,
  underscored: true,
});

// Probar conexión al iniciar
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión a BD establecida correctamente');
  })
  .catch((err) => {
    console.error('❌ Error al conectar a la BD:', err.message);
    process.exit(1);
  });

module.exports = sequelize;
