const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Notificacion = sequelize.define('Notificacion', {
  id_notificacion: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: 'id_notificacion',
  },
  id_usuario: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'tb_usuarios',
      key: 'id_usuario',
    },
  },
  mensaje: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'tb_notificaciones',
});

module.exports = Notificacion;
