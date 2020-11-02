import {
	Column,
	Entity,
	JoinTable,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"
import { ObjectType, Field } from "@nestjs/graphql"
import { Exclude } from "class-transformer"
import { Todo } from "src/todos/entities/todo.entity"

@ObjectType()
@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	@Field()
	id: string

	@Column({ unique: true })
	@Field()
	email: string

	@Column({ unique: true })
	@Field()
	username: string

	@Column({ nullable: true })
	@Field({ nullable: true })
	firstName?: string

	@Column({ nullable: true })
	@Field({ nullable: true })
	lastName?: string

	@Column()
	@Exclude({ toPlainOnly: true })
	password: string

	@OneToMany((_type) => Todo, (todo) => todo.author)
	@JoinTable()
	@Field((_type) => [Todo], { nullable: true })
	todos?: Todo[]
}
