import { ExecutionContext, Injectable, CanActivate } from "@nestjs/common"
import { UsersService } from "src/users/users.service"

@Injectable()
export class AuthenticatedGuard implements CanActivate {
	constructor(private readonly usersService: UsersService) {}
	async canActivate(context: ExecutionContext): Promise<any> {
		const request = context.switchToHttp().getRequest()
		if (request.isAuthenticated()) {
			request.user = await this.usersService.findOne(request.user.id)
			return true
		} else {
			return false
		}
	}
}
