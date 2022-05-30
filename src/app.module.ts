import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { VoiceGateway } from './voice.gateway';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '17181718',
    database: 'hidiscuss',
    entities: [], // 사용할 entity의 클래스명을 넣어둔다.
    synchronize: true, // false로 해두는 게 안전하다.
    autoLoadEntities: true, // 추가!!
  }),
  EventsModule],
  controllers: [AppController],
  providers: [AppService, VoiceGateway],
})
export class AppModule {}
