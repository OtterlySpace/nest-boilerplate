import { ExecutionContext, Injectable, CanActivate } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { UsersService } from "src/users/users.service"

@Injectable()
export class GqlAuthenticatedGuard implements CanActivate {
	constructor(private readonly usersService: UsersService) { }
	async canActivate(context: ExecutionContext): Promise<any> {
		const request = GqlExecutionContext.create(context).getContext().req
		if (request.isAuthenticated() && request.user.id) {
			request.user = await this.usersService.findOne(request.user.id)
			return true
		} else {
			return false
		}
	}
}
