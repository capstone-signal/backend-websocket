import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LiveReviewDiff } from "src/model/LiveReviewDiff.entity";
import { Repository, UpdateResult } from "typeorm";

@Injectable()
export class ReviewService {
	  constructor(
		  @InjectRepository(LiveReviewDiff)
		  private readonly liveReviewDiffRepository: Repository<LiveReviewDiff>
	  ) {}
	  async getReviewDiff(reviewDiffId: number): Promise<LiveReviewDiff> {
        return this.liveReviewDiffRepository.findOne(reviewDiffId);
      }

	  async updateReviewDiff(reviewDiff: LiveReviewDiff, codeAfter: string): Promise<UpdateResult> {
		reviewDiff.codeAfter = codeAfter;
		return this.liveReviewDiffRepository.update(reviewDiff.id, reviewDiff);
	  }
	  }
}