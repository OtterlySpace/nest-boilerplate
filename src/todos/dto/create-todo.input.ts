import { InputType, Field } from "@nestjs/graphql"
import { IsBoolean, IsNotEmpty, IsString } from "class-validator"

@InputType()
export class CreateTodoInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	title: string

	@Field()
	@IsBoolean()
	done: boolean
}
