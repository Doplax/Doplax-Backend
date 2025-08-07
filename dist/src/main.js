"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    app.enableCors();
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'), {
        prefix: '/public/',
    });
    app.setBaseViewsDir((0, path_1.join)(__dirname, 'views'));
    app.setViewEngine('ejs');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Doplax Backend API')
        .setDescription('API documentation for Doplax Backend')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/swaggerDocs/swagger-ui', app, document);
    const port = process.env.PORT || 4000;
    await app.listen(port);
    console.log(`✅ Server running on port ${port}`);
    console.log(`🚀 Application is running on: http://localhost:${port}/`);
    console.log(`📚 Swagger docs available at: http://localhost:${port}/api/swaggerDocs/swagger-ui`);
}
bootstrap().catch((error) => {
    console.error('❌ Error starting the application:', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map