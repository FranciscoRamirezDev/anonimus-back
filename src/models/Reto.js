const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Reto = sequelize.define('Reto', {
  id_reto: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_reto',
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tb_usuarios',
      key: 'id_usuario',
    },
  },
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  progreso_pct: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100,
    },
  },
}, {
  timestamps: false,
  tableName: 'tb_retos',
});

module.exports = Reto;
