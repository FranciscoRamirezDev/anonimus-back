const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comunidad = sequelize.define('Comunidad', {
  id_comunidad: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: 'id_comunidad',
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  categoria: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'tb_comunidades',
});

module.exports = Comunidad;
