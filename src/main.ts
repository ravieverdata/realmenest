import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'; // Import CorsOptions





async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // Replace with the URL of your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and other credentials
  };
  // Enable CORS with the configured options
  app.enableCors(corsOptions);


  const config = new DocumentBuilder()
    .setTitle('Realme Apis')
    .setDescription('The Realme API description')
    .setVersion('1.0')
    //.addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(4002);
}
bootstrap();
