import { PassportSerializer } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"
@Injectable()
export class SessionSerializer extends PassportSerializer {
	serializeUser(user: unknown, done: CallableFunction): any {
		done(null, user)
	}
	deserializeUser(payload: unknown, done: CallableFunction): any {
		done(null, payload)
	}
}
