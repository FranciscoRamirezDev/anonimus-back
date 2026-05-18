const User = require('./User');
const Task = require('./Task');
const Course = require('./Course');

// Relaciones
User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Task,
  Course,
};
