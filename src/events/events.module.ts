import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/service/auth/auth.module';
import { ReservationModule } from 'src/service/reservation/reservation.module';
import { ReviewModule } from 'src/service/review/review.module';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';

@Module({
    imports: [ConfigModule, ReservationModule, AuthModule, ReviewModule],
    providers : [EventsGateway, EventsService],
})
export class EventsModule {}
