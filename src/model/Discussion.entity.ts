import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { DiscussionCode } from "./DiscussionCode.entity";
import { User } from "./User.entity";

@Entity({name: "discussion"})
export class Discussion {
	@PrimaryColumn({ name: "id" })
	id: number;

	@OneToMany(() => DiscussionCode, (discussionCode) => discussionCode.discussion)
	discussionCodes: DiscussionCode[];

	@ManyToOne(
		() => User,
		{
			eager: true
		}
	)
	@JoinColumn({ name: "user_id" })
	user: User;
}
