import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LiveReviewDiff } from "src/model/LiveReviewDiff.entity";
import { Review } from "src/model/Review.entity";
import { ReviewService } from "./review.service";

@Module({
	imports: [TypeOrmModule.forFeature([LiveReviewDiff, Review])],
	providers: [ReviewService],
	exports: [ReviewService],
})
export class ReviewModule {}