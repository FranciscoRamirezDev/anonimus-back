/**
 * Carga datos de ejemplo para que la app no se vea vacía.
 * Uso: npm run seed
 *
 * Es idempotente: se puede ejecutar varias veces sin duplicar datos.
 * - Comunidades y usuarios se buscan por nombre/alias antes de crearse.
 * - Publicaciones (con sus comentarios y reacciones) solo se crean en
 *   comunidades que todavía no tienen publicaciones.
 * - Retos solo se crean para usuarios demo que todavía no tienen retos.
 */

require('dotenv').config();
const bcrypt = require('bcrypt');
const sequelize = require('../src/config/db');
const {
  Usuario,
  Comunidad,
  Publicacion,
  Comentario,
  Reaccion,
  Reto,
} = require('../src/models');

const DEMO_PASSWORD = 'anonimus123';

// Las categorías coinciden con las palabras clave de anonimus-front/lib/communityDecor.ts
// para que cada comunidad muestre su ícono.
const COMUNIDADES = [
  { nombre: 'Sobriedad Día a Día', categoria: 'Alcohol' },
  { nombre: 'Libres del Cigarrillo', categoria: 'Tabaco' },
  { nombre: 'Calma en la Tormenta', categoria: 'Ansiedad y estrés' },
  { nombre: 'Rompiendo el Silencio', categoria: 'Depresión y ánimo' },
  { nombre: 'Desconectados', categoria: 'Adicción a la tecnología' },
  { nombre: 'Noches Tranquilas', categoria: 'Sueño e insomnio' },
  { nombre: 'Comer en Paz', categoria: 'Alimentación' },
  { nombre: 'Muévete Conmigo', categoria: 'Ejercicio y deporte' },
  { nombre: 'Sobreviviendo al Semestre', categoria: 'Estudio y universidad' },
  { nombre: 'Equilibrio Laboral', categoria: 'Trabajo y empleo' },
];

const USUARIOS = [
  'LunaSilenciosa',
  'NomadaInterior',
  'FaroEnLaNiebla',
  'RaizFuerte',
  'VientoDelSur',
  'PasoAPaso',
  'OlaSerena',
  'BrujulaPerdida',
];

// Publicaciones por comunidad, con comentarios opcionales.
const PUBLICACIONES = {
  'Sobriedad Día a Día': [
    {
      contenido: 'Hoy cumplo 30 días sin tomar. No pensé que llegaría hasta aquí. Gracias a todos por leerme cuando más lo necesitaba.',
      comentarios: ['¡30 días es enorme! Muy orgulloso de ti.', 'Gracias por compartirlo, me da esperanza para seguir.'],
    },
    {
      contenido: 'Los viernes son lo más difícil. ¿Qué hacen ustedes cuando todos sus amigos salen a beber?',
      comentarios: ['Yo empecé a proponer planes de día: cine, caminatas, comida.', 'Aprendí a decir que no sin dar explicaciones. Cuesta, pero se puede.'],
    },
    {
      contenido: 'Recaí el fin de semana. Me siento muy mal, pero aquí estoy de nuevo, empezando otra vez.',
      comentarios: ['Volver es lo más valiente que puedes hacer. Aquí estamos.'],
    },
  ],
  'Libres del Cigarrillo': [
    {
      contenido: 'Una semana sin fumar. La ansiedad después de comer es lo peor, pero ya noto que respiro mejor al subir escaleras.',
      comentarios: ['A mí me ayudó masticar chicle o salir a caminar justo después de comer.'],
    },
    {
      contenido: 'Calculé cuánto dinero he ahorrado en dos meses sin cigarrillos y me voy a dar un gusto con eso 😄',
      comentarios: ['¡Te lo mereces!', 'Qué buena idea, voy a hacer lo mismo.'],
    },
  ],
  'Calma en la Tormenta': [
    {
      contenido: 'Tuve un ataque de pánico en el bus. La técnica de respiración 4-7-8 que alguien compartió aquí me salvó. Gracias.',
      comentarios: ['Me alegra que te haya servido. ¡Bien hecho por mantener la calma!', 'Voy a probarla, me pasa seguido.'],
    },
    {
      contenido: '¿Alguien más siente que la ansiedad empeora los domingos en la noche pensando en la semana?',
      comentarios: ['Totalmente. Dejar organizado el lunes desde el viernes me ayuda un poco.'],
    },
    {
      contenido: 'Pequeño logro: hoy hice una llamada que llevaba semanas evitando. Parece poco, pero para mí fue gigante.',
      comentarios: ['No es poco. ¡Felicidades!'],
    },
  ],
  'Rompiendo el Silencio': [
    {
      contenido: 'Hoy me levanté, me bañé y salí a caminar 10 minutos. Hay días en que eso ya es una victoria.',
      comentarios: ['Es una victoria. Gracias por recordarnos que los pasos pequeños cuentan.', 'Te entiendo perfectamente. Ánimo.'],
    },
    {
      contenido: 'Por fin le conté a alguien de mi familia cómo me sentía. No fue perfecto, pero me escuchó.',
      comentarios: ['Eso requiere mucho valor. Me alegra que te haya escuchado.'],
    },
  ],
  'Desconectados': [
    {
      contenido: 'Puse el celular en escala de grises y bajé de 7 a 4 horas de pantalla al día. ¡Funciona!',
      comentarios: ['No sabía de ese truco, lo voy a probar hoy mismo.', 'Yo además saqué las redes de la pantalla principal.'],
    },
    {
      contenido: 'Reto personal: nada de celular la primera hora del día. Llevo 5 días y duermo mejor.',
      comentarios: ['Me uno al reto 💪'],
    },
  ],
  'Noches Tranquilas': [
    {
      contenido: 'Llevo meses durmiendo 4 horas. ¿Alguna rutina que les haya funcionado antes de dormir?',
      comentarios: ['Sin pantallas una hora antes y leer algo en papel. Me cambió mucho.', 'Acostarme y levantarme siempre a la misma hora, incluso fines de semana.'],
    },
    {
      contenido: 'Primera noche en semanas que duermo 7 horas seguidas. Solo quería contarlo a alguien.',
      comentarios: ['¡Qué alegría! Ojalá sean muchas más.'],
    },
  ],
  'Comer en Paz': [
    {
      contenido: 'Estoy aprendiendo a no sentir culpa después de comer. Es un proceso lento, pero hoy fue un buen día.',
      comentarios: ['Los buenos días cuentan. Paso a paso.'],
    },
    {
      contenido: '¿Alguien más come por ansiedad cuando está estresado? Quiero empezar a notar cuándo me pasa.',
      comentarios: ['A mí me ayudó llevar un diario de cómo me sentía antes de comer.', 'Sí, me pasa mucho en época de exámenes.'],
    },
  ],
  'Muévete Conmigo': [
    {
      contenido: 'Empecé con caminatas de 15 minutos y hoy completé mi primera carrera de 5 km. ¡No lo puedo creer!',
      comentarios: ['¡Increíble progreso!', 'Esto me motiva a empezar. Gracias.'],
    },
    {
      contenido: 'El ejercicio se volvió mi forma de manejar la ansiedad. No tiene que ser intenso, solo constante.',
      comentarios: ['Totalmente de acuerdo. El yoga me ha ayudado muchísimo.'],
    },
  ],
  'Sobreviviendo al Semestre': [
    {
      contenido: 'Semana de parciales y siento que no me da la cabeza. ¿Cómo organizan su tiempo de estudio?',
      comentarios: ['Pomodoro: 25 minutos de estudio y 5 de descanso. Me salvó el semestre pasado.', 'Prioriza lo que más pesa en la nota y no te exijas perfección.'],
    },
    {
      contenido: 'Reprobé un examen que estudié muchísimo. Me siento frustrado, pero no voy a rendirme.',
      comentarios: ['Un examen no define lo que vales. Ánimo, el próximo sale mejor.'],
    },
    {
      contenido: 'Recordatorio: dormir también es estudiar. Una noche en vela no vale la pena.',
      comentarios: ['Lo aprendí por las malas 😅'],
    },
  ],
  'Equilibrio Laboral': [
    {
      contenido: 'Hoy por primera vez apagué las notificaciones del trabajo a las 6 pm. Nadie murió y yo descansé.',
      comentarios: ['¡Así se hace! Los límites son salud.', 'Necesito hacer lo mismo urgentemente.'],
    },
    {
      contenido: 'Siento que estoy al borde del burnout. ¿Cómo supieron que era momento de pedir ayuda?',
      comentarios: ['Cuando dejé de disfrutar todo, incluso fuera del trabajo. Hablar con alguien fue el primer paso.'],
    },
  ],
};

const RETOS = [
  { titulo: 'Una semana sin redes sociales antes de dormir', progreso: [100, 60, 30, 0] },
  { titulo: 'Caminar 20 minutos al día', progreso: [80, 50, 100, 20] },
  { titulo: 'Escribir tres cosas buenas de mi día', progreso: [40, 100, 70, 10] },
  { titulo: 'Beber 2 litros de agua diarios', progreso: [60, 30, 90, 0] },
  { titulo: 'Dormir 7 horas durante 5 noches seguidas', progreso: [20, 0, 50, 100] },
];

const REACCIONES = ['like', 'love', 'haha', 'wow', 'sad'];

// Fecha en el pasado, para que las publicaciones no tengan todas la misma hora.
const haceHoras = (horas) => new Date(Date.now() - horas * 60 * 60 * 1000);

async function seed() {
  const t = await sequelize.transaction();
  const resumen = { comunidades: 0, usuarios: 0, publicaciones: 0, comentarios: 0, reacciones: 0, retos: 0 };

  try {
    // 1. Comunidades
    const comunidades = {};
    for (const c of COMUNIDADES) {
      const [comunidad, created] = await Comunidad.findOrCreate({
        where: { nombre: c.nombre },
        defaults: c,
        transaction: t,
      });
      comunidades[c.nombre] = comunidad;
      if (created) resumen.comunidades++;
    }

    // 2. Usuarios demo
    const hash = await bcrypt.hash(DEMO_PASSWORD, 10);
    const usuarios = [];
    for (const alias of USUARIOS) {
      const [usuario, created] = await Usuario.findOrCreate({
        where: { alias },
        defaults: { alias, password_hash: hash },
        transaction: t,
      });
      usuarios.push(usuario);
      if (created) resumen.usuarios++;
    }

    // 3. Publicaciones, comentarios y reacciones
    let i = 0;
    for (const [nombre, posts] of Object.entries(PUBLICACIONES)) {
      const comunidad = comunidades[nombre];
      const existentes = await Publicacion.count({
        where: { id_comunidad: comunidad.id_comunidad },
        transaction: t,
      });
      if (existentes > 0) continue;

      for (const post of posts) {
        const autor = usuarios[i % usuarios.length];
        const publicacion = await Publicacion.create({
          id_usuario: autor.id_usuario,
          id_comunidad: comunidad.id_comunidad,
          contenido: post.contenido,
          fecha_pub: haceHoras(2 + i * 7),
        }, { transaction: t });
        resumen.publicaciones++;

        for (const [j, texto] of (post.comentarios || []).entries()) {
          await Comentario.create({
            id_publicacion: publicacion.id_publicacion,
            id_usuario: usuarios[(i + j + 1) % usuarios.length].id_usuario,
            texto,
          }, { transaction: t });
          resumen.comentarios++;
        }

        const numReacciones = 2 + (i % 5);
        for (let k = 0; k < numReacciones; k++) {
          await Reaccion.create({
            id_publicacion: publicacion.id_publicacion,
            tipo_reaccion: REACCIONES[(i + k) % REACCIONES.length],
          }, { transaction: t });
          resumen.reacciones++;
        }
        i++;
      }
    }

    // 4. Retos para los primeros usuarios demo
    for (const [u, usuario] of usuarios.slice(0, 4).entries()) {
      const tiene = await Reto.count({ where: { id_usuario: usuario.id_usuario }, transaction: t });
      if (tiene > 0) continue;
      for (const reto of RETOS) {
        await Reto.create({
          id_usuario: usuario.id_usuario,
          titulo: reto.titulo,
          progreso_pct: reto.progreso[u],
        }, { transaction: t });
        resumen.retos++;
      }
    }

    await t.commit();
    console.log('\n🌱 Datos de ejemplo cargados:');
    console.table(resumen);
    console.log(`Usuarios demo: ${USUARIOS.join(', ')}`);
    console.log(`Contraseña de todos los usuarios demo: ${DEMO_PASSWORD}\n`);
  } catch (err) {
    await t.rollback();
    console.error('❌ Error al cargar datos, no se guardó nada:', err.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

seed();
