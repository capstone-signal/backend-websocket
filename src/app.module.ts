import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { VoiceGateway } from './voice.gateway';

@Module({
  imports: [EventsModule],
  controllers: [AppController],
  providers: [AppService, VoiceGateway],
})
export class AppModule {}
