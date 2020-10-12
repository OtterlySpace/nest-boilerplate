import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import * as argon2 from "argon2"
import { CreateUserInput } from "./dto/create-user.input"
import { UpdateUserInput } from "./dto/update-user.input"
import { User } from "./entities/user.entity"

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) { }

	async create(createUserInput: CreateUserInput): Promise<User> {
		const password = await this.hashPassword(createUserInput.password)
		const user = this.userRepository.create({ ...createUserInput, password })
		return this.userRepository.save(user)
	}

	findAll(): Promise<User[]> {
		return this.userRepository.find({
			relations: [],
		})
	}

	async findOne(id: string): Promise<User> {
		const user = await this.userRepository.findOne(id, {
		})
		if (!user) {
			throw new NotFoundException(`User ${id} not found`)
		}
		return user
	}

	async findOneByUsername(username: string): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { username: username },
			relations: [],
		})
		if (!user) {
			throw new NotFoundException(`User ${username} not found`)
		}
		return user
	}

	async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
		const user = await this.userRepository.preload({
			id,
			...updateUserInput,
		})
		if (!user) {
			throw new NotFoundException(`User ${id} not found`)
		}
		return this.userRepository.save(user)
	}

	async remove(id: string): Promise<User> {
		const user = await this.findOne(id)
		await this.userRepository.remove(user)
		return { ...user, id }
	}

	async hashPassword(password: string): Promise<string> {
		const hash = await argon2.hash(password, {
			type: argon2.argon2id,
			parallelism: 4
		})
		return hash
	}
}
