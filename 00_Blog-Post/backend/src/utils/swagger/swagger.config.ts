import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function swaggerInit(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Swagger API Docs')
    .setDescription('Swagger Test')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document); //경로 설정
}
