import { PartialType } from "@nestjs/mapped-types"
import { CreateTodoInput } from "./create-todo.input"
import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
	@Field()
	id: string;
}