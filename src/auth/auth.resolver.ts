import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { User } from "src/users/entities/user.entity"
import { UsersService } from "src/users/users.service"
import { LoginUserDto } from "./dto/login-user.dto"
import { GqlLocalAuthGuard } from "./gql-local-auth.guard"
import { GqlAuthenticatedGuard } from "./gql-authenticated.guard"
import { CurrentUser } from "./current-user.decorator"

@Resolver()
export class AuthResolver {
	constructor(private readonly usersService: UsersService) {}

	@Mutation(() => User)
	@UseGuards(GqlLocalAuthGuard)
	loginUser(
		@Args("loginUserInput") loginUserInput: LoginUserDto
	): Promise<User> {
		return this.usersService.findOneByUsernameOrEmail(
			loginUserInput.username
		)
	}

	@Query(() => User, { name: "me" })
	@UseGuards(GqlAuthenticatedGuard)
	whoAmI(@CurrentUser() user: User): Promise<User> {
		return this.usersService.findOne(user.id)
	}
}
