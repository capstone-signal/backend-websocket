import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LiveReviewDiff } from "src/model/LiveReviewDiff.entity";
import { Repository } from "typeorm";

@Injectable()
export class ReviewService {
	  constructor(
		  @InjectRepository(LiveReviewDiff)
		  private readonly liveReviewDiffRepository: Repository<LiveReviewDiff>
	  ) {}
	  getReviewDiff(reviewDiffId: number): Promise<LiveReviewDiff> {
        return this.liveReviewDiffRepository.findOne(reviewDiffId);
    }
}