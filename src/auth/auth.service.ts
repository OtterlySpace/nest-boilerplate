import { Injectable } from "@nestjs/common"
import { UsersService } from "src/users/users.service"
import * as argon2 from "argon2"
import { User } from "src/users/entities/user.entity"

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.usersService.findOneByUsername(username)
		if (
			user &&
			(await argon2.verify(user.password, pass, {
				type: argon2.argon2id,
				parallelism: 4
			}))
		) {
			return user
		}
		return null
	}

	async returnLoggedUser(username: string): Promise<User> {
		return this.usersService.findOneByUsername(username)
	}
}
