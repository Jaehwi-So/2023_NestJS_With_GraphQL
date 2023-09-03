import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';
import { winstonLogger } from './utils/winston/winston.config';
import { swaggerInit } from './utils/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = winstonLogger;
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  swaggerInit(app);
  await app.listen(3000);
}
bootstrap();
