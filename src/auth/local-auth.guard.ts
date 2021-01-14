import { BadRequestException, ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { validateSync } from "class-validator"
import { LoginUserDto } from "./dto/login-user.dto"

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
	getRequest(context: ExecutionContext): any {
		// Test if input is valid
		const loginUserInput = context.switchToHttp().getRequest().body
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
			return context.switchToHttp().getRequest()
		}
	}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const result = (await super.canActivate(context)) as boolean
		const request = context.switchToHttp().getRequest()
		await super.logIn(request)
		return result
	}
}
