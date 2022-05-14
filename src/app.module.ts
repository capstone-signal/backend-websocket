import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { EventsModule } from './events/events.module';
import { Discussion } from './model/Discussion.entity';
import { DiscussionCode } from './model/DiscussionCode.entity';
import { Review } from './model/Review.entity';
import { ReviewReservation } from './model/ReviewReservation.entity';
import { User } from './model/User.entity';
import { VoiceGateway } from './voice.gateway';

@Module({
  imports: [EventsModule, ConfigModule.forRoot({
    load: [configuration]
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Discussion, DiscussionCode, Review, ReviewReservation],
    synchronize: false,
  })
],
  controllers: [AppController],
  providers: [AppService, VoiceGateway],
})
export class AppModule {}
