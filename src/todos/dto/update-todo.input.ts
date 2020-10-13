import { PartialType } from "@nestjs/mapped-types"
import { CreateTodoInput } from "./create-todo.input"
import { InputType, Field } from "@nestjs/graphql"
import { IsBoolean, IsString } from "class-validator"

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
	@Field()
	@IsString()
	id: string;

	@Field({ nullable: true })
	@IsString()
	title?: string

	@Field({ nullable: true })
	@IsBoolean()
	done?: boolean
}