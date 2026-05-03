const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Anonimus API',
      version: '1.0.0',
      description: 'API REST documentation',
    },
  },
  apis: ['./src/modules/**/*.router.js'],
};

module.exports = swaggerJSDoc(options);
