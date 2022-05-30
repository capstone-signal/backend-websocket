import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Discussion } from "./Discussion.entity";
import { Review } from "./Review.entity";
import { User } from "./User.entity";

@Entity({ name: "review_reservation" })
export class ReviewReservation {
	@PrimaryColumn({ name: "id" })
	id: number;

	@Column({ name: "review_start_date", type: "datetime"})
	reviewStartDate: Date;

	@Column({ name: "reviewer_participated", type: "tinyint" })
	reviewerParticipated: boolean;
	
	@Column({ name: "reviewee_participated", type: "tinyint" })
	revieweeParticipated: boolean;

	@ManyToOne(() => User, {
		eager: true
	})
	@JoinColumn({ name: "reviewer_id" })
	reviewer: User;	

	@ManyToOne(() => Review, {
		eager: true
	})
	@JoinColumn({ name: "review_id" })
	review: Review;

	@ManyToOne(() => Discussion, {
		eager: true
	})
	@JoinColumn({ name: "discussion_id" })
	discussion: Discussion;
}
