import { NestFactory } from '@nestjs/core';
import * as express from 'express';

import { AppModule } from './app.module';
import { UPLOAD_DIR } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(`/${UPLOAD_DIR}`, express.static(UPLOAD_DIR));

  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
