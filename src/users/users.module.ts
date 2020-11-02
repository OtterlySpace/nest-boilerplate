import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { UsersService } from "./users.service"
import { UsersResolver } from "./users.resolver"
import { User } from "./entities/user.entity"
import { Todo } from "src/todos/entities/todo.entity"

@Module({
	imports: [TypeOrmModule.forFeature([User, Todo])],
	providers: [UsersResolver, UsersService],
	exports: [UsersService]
})
export class UsersModule {}
