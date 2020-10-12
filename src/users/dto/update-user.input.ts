import { PartialType } from "@nestjs/mapped-types"
import { CreateUserInput } from "./create-user.input"
import { InputType, Field } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
	@Field()
	@IsString()
	@IsNotEmpty()
	id: string;
}