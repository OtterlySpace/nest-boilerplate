import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import { TodosService } from "./todos.service"
import { Todo } from "./entities/todo.entity"
import { CreateTodoInput } from "./dto/create-todo.input"
import { UpdateTodoInput } from "./dto/update-todo.input"
import { GqlAuthenticatedGuard } from "src/auth/gql-authenticated.guard"
import { UseGuards } from "@nestjs/common"
import { User } from "src/users/entities/user.entity"
import { CurrentUser } from "src/auth/current-user.decorator"

@Resolver(() => Todo)
export class TodosResolver {
	constructor(private readonly todosService: TodosService) {}

	@Mutation(() => Todo)
	@UseGuards(GqlAuthenticatedGuard)
	createTodo(
		@Args("createTodoInput") createTodoInput: CreateTodoInput,
		@CurrentUser() user: User
	): Promise<Todo> {
		return this.todosService.create(createTodoInput, user.id)
	}

	@Query(() => [Todo], { name: "todos" })
	@UseGuards(GqlAuthenticatedGuard)
	findAll(@CurrentUser() user: User): Promise<Todo[]> {
		return this.todosService.findAll(user.id)
	}

	@Query(() => Todo, { name: "todo" })
	@UseGuards(GqlAuthenticatedGuard)
	findOne(@Args("id") id: string): Promise<Todo> {
		return this.todosService.findOne(id)
	}

	@Mutation(() => Todo)
	@UseGuards(GqlAuthenticatedGuard)
	updateTodo(
		@Args("updateTodoInput") updateTodoInput: UpdateTodoInput
	): Promise<Todo> {
		return this.todosService.update(updateTodoInput.id, updateTodoInput)
	}

	@Mutation(() => Todo)
	@UseGuards(GqlAuthenticatedGuard)
	removeTodo(@Args("id") id: string): Promise<Todo> {
		return this.todosService.remove(id)
	}
}
