import { InputType, Field } from "@nestjs/graphql"
import {
	IsEmail,
	IsNotEmpty,
	MaxLength,
	IsString,
	MinLength
} from "class-validator"

@InputType()
export class CreateUserInput {
	@Field()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Field()
	@IsString()
	@IsNotEmpty()
	username: string;

	@Field({ nullable: true })
	firstName?: string

	@Field({ nullable: true })
	lastName?: string

	@Field()
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	@MaxLength(64)
	password: string;
}