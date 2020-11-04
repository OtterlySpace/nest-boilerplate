import { ExecutionContext, Injectable } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { AuthGuard } from "@nestjs/passport"
import { UsersService } from "src/users/users.service"

@Injectable()
export class GqlLocalAuthGuard extends AuthGuard("local") {
	constructor(private readonly usersService: UsersService) {
		super()
	}
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context)
		return { body: { ...ctx.getArgs().loginUserInput } }
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
