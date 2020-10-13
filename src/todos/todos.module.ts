import { Module } from "@nestjs/common"
import { TodosService } from "./todos.service"
import { TodosResolver } from "./todos.resolver"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Todo } from "./entities/todo.entity"
import { UsersModule } from "src/users/users.module"

@Module({
	imports: [TypeOrmModule.forFeature([Todo]), UsersModule],
	providers: [TodosResolver, TodosService]
})
export class TodosModule { }
