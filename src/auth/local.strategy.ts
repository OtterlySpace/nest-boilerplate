import { Strategy } from "passport-local"
import { PassportStrategy } from "@nestjs/passport"
import {
	Injectable,
	UnauthorizedException,
	BadRequestException
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { LoginUserDto } from "./dto/login-user.dto"
import { validate } from "class-validator"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super()
	}

	async validate(username: string, password: string): Promise<any> {
		// Test if input is valid
		const loginUser = new LoginUserDto()
		loginUser.username = username
		loginUser.password = password
		await validate(loginUser).then((err) => {
			// If validation fails, send a Bad Request error with validation errors
			if (err.length > 0) {
				const errors = [].concat(
					...err.map((e) => Object.values(e.constraints))
				)
				throw new BadRequestException(errors)
			}
		})

		const user = await this.authService.validateUser(username, password)
		if (!user) {
			throw new UnauthorizedException("wrong username or password")
		}
		return user
	}
}
