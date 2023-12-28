import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokemon API',
      version: '1.0.0',
      description: 'Uma API Express Pokémon simples',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
