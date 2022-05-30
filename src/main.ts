import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule, {
      logger: ['debug', 'warn', 'log' , 'error', 'verbose']
    }
  );

  app.use(cookieParser())
  app.enableCors({
    origin: 'http://localhost:8080/'
  });

 
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
