import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { GraphQLModule } from "@nestjs/graphql"
import { join } from "path"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { TodosModule } from "./todos/todos.module"

@Module({
	imports: [
		GraphQLModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				context: ({ req }) => ({ req }),
				autoSchemaFile: join(process.cwd(), "src/schema.gql"),
				sortSchema: true,
				cors: {
					origin: configService
						.get("CORS_ORIGINS", "http://localhost:3000")
						.split(","),
					credentials: true
				}

			})
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				type: "postgres", // type of our database
				host: configService.get("POSTGRES_HOST", "localhost"), // database host
				port: configService.get("POSTGRES_PORT", 5432), // database port
				username: configService.get("POSTGRES_USER", "postgres"), // username
				password: configService.get("POSTGRES_PASSWORD", "pass123"), // user password
				database: configService.get("POSTGRES_DB", "postgres"), // name of our database,
				autoLoadEntities: true, // models will be loaded automatically (you don't have to explicitly specify the entities: [] array)
				synchronize: false // your entities will be synced with the database (ORM will map entity definitions to corresponding SQL tabled), every time you run the application (recommended: disable in the production)
			})
		}),
		AuthModule,
		UsersModule,
		TodosModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
