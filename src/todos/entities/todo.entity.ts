import { ObjectType, Field, Int } from "@nestjs/graphql"
import { User } from "src/users/entities/user.entity"
import {
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm"

@ObjectType()
@Entity()
export class Todo {
	@PrimaryGeneratedColumn("uuid")
	@Field()
	id: string;

	@Column()
	@Field()
	title: string

	@Column()
	@Field()
	done: boolean

	@ManyToOne(
		_type => User,
		user => user.todos
	)
	@Field(_type => User)
	author: User
}
