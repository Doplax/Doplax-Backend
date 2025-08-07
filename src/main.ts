import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Global pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // CORS
  app.enableCors();

  // Static files
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });

  // View engine
  app.setBaseViewsDir(join(__dirname, 'views'));
  app.setViewEngine('ejs');

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Doplax Backend API')
    .setDescription('API documentation for Doplax Backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swaggerDocs/swagger-ui', app, document);

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