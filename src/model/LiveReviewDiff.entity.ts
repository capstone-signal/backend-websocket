import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Review } from "./Review.entity";

@Entity({ name: "live_review_diff"})
export class LiveReviewDiff {
	@PrimaryColumn({ name: "id" })
	id: number;

	@ManyToOne(() => Review)
	@JoinColumn({ name: "review_id" })
	review: Review;

	@Column({ name: "code_after"})
	codeAfter: string;
}