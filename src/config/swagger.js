const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Anonimus API",
      version: "1.0.0",
      description:
        "API REST para la plataforma Anonimus - Red social anónima con comunidades y desafíos",
      contact: {
        name: "Francisco Ramirez",
        url: "https://github.com/FranciscoRamirezDev/anonimus-back",
      },
      license: {
        name: "ISC",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desarrollo",
      },
      {
        url: "https://anonimus-back.onrender.com",
        description: "Servidor de producción",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Token JWT para autenticación",
        },
      },
      schemas: {
        Usuario: {
          type: "object",
          properties: {
            id_usuario: {
              type: "integer",
              description: "ID único del usuario",
            },
            alias: {
              type: "string",
              minLength: 3,
              maxLength: 50,
              description: "Nombre de usuario único",
            },
            password_hash: {
              type: "string",
              description:
                "Hash de la contraseña (no se devuelve en respuestas)",
            },
            avatar_url: {
              type: "string",
              format: "url",
              nullable: true,
              description: "URL del avatar del usuario",
            },
            fecha_registro: {
              type: "string",
              format: "date-time",
              description: "Fecha de registro del usuario",
            },
          },
          required: ["alias", "password_hash"],
        },
        Comunidad: {
          type: "object",
          properties: {
            id_comunidad: {
              type: "integer",
            },
            nombre: {
              type: "string",
              minLength: 3,
              maxLength: 100,
              description: "Nombre único de la comunidad",
            },
            categoria: {
              type: "string",
              maxLength: 50,
              description: "Categoría de la comunidad",
            },
          },
          required: ["nombre", "categoria"],
        },
        Publicacion: {
          type: "object",
          properties: {
            id_publicacion: {
              type: "integer",
            },
            id_usuario: {
              type: "integer",
            },
            id_comunidad: {
              type: "integer",
            },
            contenido: {
              type: "string",
              description: "Contenido de la publicación",
            },
            fecha_pub: {
              type: "string",
              format: "date-time",
            },
            es_valida: {
              type: "boolean",
              default: true,
            },
          },
          required: ["id_usuario", "id_comunidad", "contenido"],
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
            status: {
              type: "integer",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/modules/**/*.router.js"],
};

module.exports = swaggerJSDoc(options);
