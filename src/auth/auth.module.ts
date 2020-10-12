import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"

import { UsersModule } from "src/users/users.module"
import { AuthService } from "./auth.service"
import { SessionSerializer } from "./session.serializer"
import { AuthResolver } from "./auth.resolver"
import { LocalStrategy } from "./local.strategy"

@Module({
	imports: [UsersModule, PassportModule.register({ session: true })],
	providers: [AuthService, LocalStrategy, SessionSerializer, AuthResolver],
	exports: [AuthService]
})
export class AuthModule { }
