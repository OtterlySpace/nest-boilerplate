import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "src/users/entities/user.entity"
import { UsersService } from "src/users/users.service"
import { Repository } from "typeorm"
import { CreateTodoInput } from "./dto/create-todo.input"
import { UpdateTodoInput } from "./dto/update-todo.input"
import { Todo } from "./entities/todo.entity"

@Injectable()
export class TodosService {
	constructor(
		@InjectRepository(Todo)
		private readonly todoRepository: Repository<Todo>,
		private readonly usersService: UsersService
	) { }

	async create(createTodoInput: CreateTodoInput, authorId: string): Promise<Todo> {
		const author = await this.preloadUserByUid(authorId)
		const todo = this.todoRepository.create({ ...createTodoInput, author })
		return this.todoRepository.save(todo)
	}

	findAll(authorId: string): Promise<Todo[]> {
		return this.todoRepository.find({
			relations: ["author"],
			where: { author: { id: authorId } }
		})
	}

	async findOne(id: string): Promise<Todo> {
		const todo = await this.todoRepository.findOne(id, {
			relations: ["author"],
		})
		if (!todo) {
			throw new NotFoundException(`Todo ${id} not found`)
		}
		return todo
	}

	async update(id: string, updateTodoInput: UpdateTodoInput): Promise<Todo> {
		const todo = await this.todoRepository.preload({
			id,
			...updateTodoInput,
		})
		if (!todo) {
			throw new NotFoundException(`Todo ${id} not found`)
		}
		return this.todoRepository.save(todo)
	}

	async remove(id: string): Promise<Todo> {
		const todo = await this.findOne(id)
		await this.todoRepository.remove(todo)
		return { ...todo, id }
	}

	private async preloadUserByUid(uid: string): Promise<User> {
		const existingUser = await this.usersService.findOne(uid)
		if (!existingUser) {
			throw new NotFoundException(`User #${uid} not found`)
		}
		return existingUser
	}
}
