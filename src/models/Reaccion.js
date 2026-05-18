const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Reaccion = sequelize.define('Reaccion', {
  id_reaccion: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: 'id_reaccion',
  },
  id_publicacion: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'tb_publicaciones',
      key: 'id_publicacion',
    },
  },
  tipo_reaccion: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['like', 'love', 'haha', 'wow', 'sad', 'angry']],
    },
  },
}, {
  timestamps: false,
  tableName: 'tb_reacciones',
});

module.exports = Reaccion;
