import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Classe principal de configuração e inicialização da aplicação
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: false,
    logger: ['debug', 'error', 'log', 'verbose', 'warn']
  });

  const apiInfo = new DocumentBuilder()
    .setTitle('Challenge BossaBox - Rest API')
    .setVersion('v1')
    .setContact('João Felipe Vagmacker Ribeiro', '', 'vagmackerdsm@gmail.com')
    .setDescription('API Rest da aplicação VUTTR (Very Useful Tools to Remember).')
    .setLicense(
      'Apache License 2.0',
      'http://www.apache.org/licenses/LICENSE-2.0',
    )
    .build();

  const document = SwaggerModule.createDocument(app, apiInfo);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
