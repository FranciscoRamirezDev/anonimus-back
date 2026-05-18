const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Reporte = sequelize.define('Reporte', {
  id_reporte: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: 'id_reporte',
  },
  id_publicacion: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'tb_publicaciones',
      key: 'id_publicacion',
    },
  },
  id_admin: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'tb_administradores',
      key: 'id_admin',
    },
  },
  estado: {
    type: DataTypes.STRING(20),
    defaultValue: 'pendiente',
    validate: {
      isIn: [['pendiente', 'revisado', 'aprobado', 'rechazado']],
    },
  },
}, {
  timestamps: false,
  tableName: 'tb_reportes',
});

module.exports = Reporte;
