const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comentario = sequelize.define('Comentario', {
  id_comentario: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: 'id_comentario',
  },
  id_publicacion: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'tb_publicaciones',
      key: 'id_publicacion',
    },
  },
  id_usuario: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'tb_usuarios',
      key: 'id_usuario',
    },
  },
  texto: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'tb_comentarios',
});

module.exports = Comentario;
