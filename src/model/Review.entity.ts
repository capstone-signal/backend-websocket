import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Discussion } from "./Discussion.entity";
import { User } from "./User.entity";


@Entity({ name: "review" })
export class Review {
	@PrimaryColumn({ name: "id" })
	id: number;

	@Column({ name: "review_type" })
	reviewType: "COMMENT" | "LIVE";

	@ManyToOne(() => User, {
		eager: true
	})
	@JoinColumn({ name: "reviewer_id" })
	reviewer: User;	

	@ManyToOne(() => Discussion, {
		eager: true
	})
	@JoinColumn({ name: "discussion_id" })
	discussion: Discussion;
}