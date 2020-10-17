import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common"
import { User } from "src/users/entities/user.entity"
import { UsersService } from "src/users/users.service"
import { AuthenticatedGuard } from "./authenticated.guard"
import { LoginUserDto } from "./dto/login-user.dto"
import { LocalAuthGuard } from "./local-auth.guard"

@Controller("auth")
export class AuthController {
	constructor(private readonly usersService: UsersService) { }

	@Post("login")
	@UseGuards(LocalAuthGuard)
	async loginUser(@Body() loginUserInput: LoginUserDto): Promise<User> {
		const user = await this.usersService.findOneByUsername(loginUserInput.username)
		delete user.password
		return user
	}

	@Get("logout")
	@UseGuards(AuthenticatedGuard)
	async logoutUser(@Req() req: Record<string, any>): Promise<User> {
		const user = await this.usersService.findOne(req.user.id)
		delete user.password
		req.logout()
		return user
	}

}
