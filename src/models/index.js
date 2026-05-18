const Usuario = require('./Usuario');
const Comunidad = require('./Comunidad');
const Publicacion = require('./Publicacion');
const Comentario = require('./Comentario');
const Reaccion = require('./Reaccion');
const Reto = require('./Reto');
const Notificacion = require('./Notificacion');
const Administrador = require('./Administrador');
const Reporte = require('./Reporte');

// ============= RELACIONES =============

// Usuario - Publicaciones (1:N)
Usuario.hasMany(Publicacion, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
Publicacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Usuario - Comentarios (1:N)
Usuario.hasMany(Comentario, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
Comentario.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Usuario - Retos (1:N)
Usuario.hasMany(Reto, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
Reto.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Usuario - Notificaciones (1:N)
Usuario.hasMany(Notificacion, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
Notificacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Comunidad - Publicaciones (1:N)
Comunidad.hasMany(Publicacion, { foreignKey: 'id_comunidad', onDelete: 'CASCADE' });
Publicacion.belongsTo(Comunidad, { foreignKey: 'id_comunidad' });

// Publicacion - Comentarios (1:N)
Publicacion.hasMany(Comentario, { foreignKey: 'id_publicacion', onDelete: 'CASCADE' });
Comentario.belongsTo(Publicacion, { foreignKey: 'id_publicacion' });

// Publicacion - Reacciones (1:N)
Publicacion.hasMany(Reaccion, { foreignKey: 'id_publicacion', onDelete: 'CASCADE' });
Reaccion.belongsTo(Publicacion, { foreignKey: 'id_publicacion' });

// Publicacion - Reportes (1:N)
Publicacion.hasMany(Reporte, { foreignKey: 'id_publicacion', onDelete: 'CASCADE' });
Reporte.belongsTo(Publicacion, { foreignKey: 'id_publicacion' });

// Administrador - Reportes (1:N)
Administrador.hasMany(Reporte, { foreignKey: 'id_admin', onDelete: 'CASCADE' });
Reporte.belongsTo(Administrador, { foreignKey: 'id_admin' });

module.exports = {
  Usuario,
  Comunidad,
  Publicacion,
  Comentario,
  Reaccion,
  Reto,
  Notificacion,
  Administrador,
  Reporte,
};
