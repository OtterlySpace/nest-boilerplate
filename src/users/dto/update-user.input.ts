import { PartialType } from "@nestjs/mapped-types"
import { CreateUserInput } from "./create-user.input"
import { InputType, Field } from "@nestjs/graphql"
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
	@Field()
	@IsString()
	@IsNotEmpty()
	id: string

	@Field({ nullable: true })
	@IsString()
	firstName?: string

	@Field({ nullable: true })
	@IsString()
	lastName?: string

	@Field({ nullable: true })
	@IsString()
	@MinLength(8)
	@MaxLength(64)
	password: string
}
