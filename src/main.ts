import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule, {
      logger: ['debug', 'warn', 'log' , 'error', 'verbose']
    }
  );
  
  app.useWebSocketAdapter(new IoAdapter(app));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.enableCors({
    origin: 'http://localhost:3000/'
  });

 
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
