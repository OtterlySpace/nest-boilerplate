import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, MaxLength, IsString, MinLength } from "class-validator"

@InputType()
export class LoginUserDto {
	@IsString()
	@IsNotEmpty()
	@Field()
	username: string

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	@MaxLength(64)
	@Field()
	password: string
}
