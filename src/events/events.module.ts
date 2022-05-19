import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/service/auth/auth.module';
import { ReservationModule } from 'src/service/reservation/reservation.module';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';

@Module({
    imports: [ConfigModule, ReservationModule, AuthModule],
    providers : [EventsGateway, EventsService],
})
export class EventsModule {}
