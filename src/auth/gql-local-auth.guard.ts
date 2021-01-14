import {
	BadRequestException,
	ExecutionContext,
	Injectable
} from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { AuthGuard } from "@nestjs/passport"
import { validate, validateSync } from "class-validator"
import { UsersService } from "src/users/users.service"
import { LoginUserDto } from "./dto/login-user.dto"

@Injectable()
export class GqlLocalAuthGuard extends AuthGuard("local") {
	constructor(private readonly usersService: UsersService) {
		super()
	}
	getRequest(context: ExecutionContext): any {
		const ctx = GqlExecutionContext.create(context)
		const loginUserInput = ctx.getArgs().loginUserInput
		// Test if input is valid
		const loginUser = new LoginUserDto()
		loginUser.username = loginUserInput.username
		loginUser.password = loginUserInput.password
		const error = validateSync(loginUser)
		// If validation fails, send a Bad Request error with validation errors
		if (error.length > 0) {
			const errors = [].concat(
				...error.map((e) => Object.values(e.constraints))
			)
			throw new BadRequestException(errors)
		} else {
			return { body: { ...loginUser } }
		}
	}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const result = await super.canActivate(context)
		const ctx = GqlExecutionContext.create(context)
		const request = ctx.getContext().req
		const { username } = ctx.getArgs().loginUserInput
		const user = await this.usersService.findOneByUsernameOrEmail(username)
		delete user.password
		request.user = user
		await super.logIn(request)
		return result ? true : false
	}
}
