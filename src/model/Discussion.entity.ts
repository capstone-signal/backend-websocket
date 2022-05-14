import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { DiscussionCode } from "./DiscussionCode.entity";

@Entity({name: "discussion"})
export class Discussion {
	@PrimaryColumn({ name: "id" })
	id: number;

	@OneToMany(() => DiscussionCode, (discussionCode) => discussionCode.discussion)
	discussionCodes: DiscussionCode[];
}
