import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { swaggerConfig } from './main/config/docs/swagger-config';

async function bootstrap() {
  const logger = new Logger('Main');
  console.log('1oiiiiiiiiiiii');

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
  );
  console.log('2oiiiiiiiiiiii');
  swaggerConfig(app);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  console.log('3oiiiiiiiiiiii');

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('PORT');
  console.log('4oiiiiiiiiiiii');

  await app.listen(3003);
  logger.log(`Application is running on: ${await app.getUrl()}`);
  console.log('4oiiiiiiiiiiii');
}
bootstrap();
