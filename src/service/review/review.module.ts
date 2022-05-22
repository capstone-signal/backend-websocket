import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LiveReviewDiff } from "src/model/LiveReviewDiff.entity";
import { ReviewService } from "./review.service";

@Module({
	imports: [TypeOrmModule.forFeature([LiveReviewDiff])],
	providers: [ReviewService],
	exports: [ReviewService],
})
export class ReviewModule {}