import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Discussion } from "./Discussion.entity";

@Entity({ name: "discussion_code" })
export class DiscussionCode {
	@PrimaryColumn({ name: "id" })
	id: number;

	@ManyToOne(() => Discussion, {
		eager: true
	})
	@JoinColumn({ name: "discussion_id" })
	discussion: Discussion;

	@Column( { name: 'content', type: 'mediumtext' })
	content: string;
}

