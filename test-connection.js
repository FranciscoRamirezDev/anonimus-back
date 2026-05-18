/**
 * Script para probar la conexión a la base de datos
 * Uso: node test-connection.js
 */

require('dotenv').config();
const sequelize = require('./src/config/db');
const { User, Task, Course } = require('./src/models');

async function testConnection() {
  console.log('\n🔍 Iniciando pruebas de conexión...\n');

  try {
    // Test 1: Autenticación
    console.log('1️⃣  Autenticando con BD...');
    await sequelize.authenticate();
    console.log('   ✅ Autenticación exitosa\n');

    // Test 2: Sincronización
    console.log('2️⃣  Sincronizando modelos...');
    await sequelize.sync({ alter: false });
    console.log('   ✅ Modelos sincronizados\n');

    // Test 3: Contar registros
    console.log('3️⃣  Verificando tablas...');
    const userCount = await User.count();
    const taskCount = await Task.count();
    const courseCount = await Course.count();
    
    console.log(`   👥 Usuarios: ${userCount}`);
    console.log(`   📋 Tareas: ${taskCount}`);
    console.log(`   📚 Cursos: ${courseCount}\n`);

    console.log('✅ ¡Todas las pruebas pasaron correctamente!\n');
    console.log('📊 Información de la conexión:');
    console.log(`   Host: ${process.env.DB_HOST}`);
    console.log(`   Base de Datos: ${process.env.DB_NAME}`);
    console.log(`   Usuario: ${process.env.DB_USER}`);
    console.log(`   Dialect: ${process.env.DB_DIALECT}\n`);

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
    console.error('\n📋 Detalles:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
    console.log('🔌 Conexión cerrada\n');
  }
}

testConnection();
