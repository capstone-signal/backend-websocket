import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'user'})
export class User {
	@PrimaryColumn({name: 'id'})
	id: number;

	@Column({name: 'email' })
	email: string;

	@Column({ name: 'username'})
	username: string;
}