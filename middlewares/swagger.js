/**
 * 
 * @module middlewares/swagger
 * @requires swagger-jsdoc
 */

import swaggerJSDoc from 'swagger-jsdoc'


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Playlist management',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);