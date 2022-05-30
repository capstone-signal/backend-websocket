import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewReservation } from "src/model/ReviewReservation.entity";
import { ReservationService } from "./reservation.service";


@Module({
	imports: [TypeOrmModule.forFeature([ReviewReservation])],
	controllers: [],
	providers: [ReservationService],
	exports: [ReservationService]
})
export class ReservationModule {}