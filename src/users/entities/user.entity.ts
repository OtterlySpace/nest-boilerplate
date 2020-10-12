import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm"
import { ObjectType, Field } from "@nestjs/graphql"
import { Exclude } from "class-transformer"

@ObjectType()
@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	@Field()
	id: string;

	@Column({ unique: true })
	@Field()
	email: string;

	@Column({ unique: true })
	@Field()
	username: string;

	@Column({ nullable: true })
	@Field({ nullable: true })
	firstName?: string

	@Column({ nullable: true })
	@Field({ nullable: true })
	lastName?: string

	@Column()
	@Exclude({ toPlainOnly: true })
	password: string;
}
