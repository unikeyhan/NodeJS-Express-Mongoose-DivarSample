const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

function SwaggerConfig(app) {
    const swaggerDocumenst = swaggerJsDoc({
        swaggerDefinition: {
            openapi: '3.0.1',
            info: {
                title: 'divar-backend',
                description: 'keyhan try to do nodejs project',
                version: '1.0.0',
            },
        },
        apis: [process.cwd() + '/src/modules/**/*.swagger.js'],
    });

    const swagger = swaggerUi.setup(swaggerDocumenst, {});
    app.use('/swagger', swaggerUi.serve, swagger);
}

module.exports = SwaggerConfig;
