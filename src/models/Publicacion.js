const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Publicacion = sequelize.define('Publicacion', {
  id_publicacion: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: 'id_publicacion',
  },
  id_usuario: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'tb_usuarios',
      key: 'id_usuario',
    },
  },
  id_comunidad: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'tb_comunidades',
      key: 'id_comunidad',
    },
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha_pub: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  es_valida: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: false,
  tableName: 'tb_publicaciones',
});

module.exports = Publicacion;
