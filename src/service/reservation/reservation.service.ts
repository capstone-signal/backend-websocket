import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReviewReservation } from "src/model/ReviewReservation.entity";
import { Repository } from "typeorm";

@Injectable()
export class ReservationService {
	constructor(
		@InjectRepository(ReviewReservation)
		private readonly reviewReservationRepository: Repository<ReviewReservation>,
	) {}

	async findById(id: number): Promise<ReviewReservation> {
		return this.reviewReservationRepository.findOne(id);
	}

	isProcessing(reservation: ReviewReservation): boolean {
		const startTime = new Date(reservation.reviewStartDate);
		const now = new Date().getTime();
		const cond1 = now - startTime.getTime() > 0;
		const cond2 = now - startTime.getTime() < 1000 * 60 * 60;
		return cond1 && cond2;
	}
}
