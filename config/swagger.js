import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Power Clean',
            version: '1.0.0',
            description: 'Documentación completa de la API de la empresa Power Clean',
        },
        servers: [
            {
                url: '/', // Permitir que Swagger use cualquier dominio
            },
        ],
    },
    apis: ['./routes/**/*Route.js'], // Archivos donde están las rutas para generar la documentación
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger docs available at /api-docs');
};

export default swaggerDocs;
