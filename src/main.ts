import { NestFactory } from "@nestjs/core"
import { ConfigService } from "@nestjs/config"
import { NestExpressApplication } from "@nestjs/platform-express"
import { AppModule } from "./app.module"
import * as rateLimit from "express-rate-limit"
import * as session from "express-session"
import * as passport from "passport"
import * as redis from "redis"
import * as redisSessionStore from "connect-redis"
import * as redisRatelimitStore from "rate-limit-redis"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	const configService = app.get(ConfigService)
	const RedisSessionStore = redisSessionStore(session)
	const RedisClient = redis.createClient({
		host: configService.get("REDIS_SESSIONS_HOST", "127.0.0.1"),
		port: configService.get("REDIS_SESSIONS_PORT", 6379)
	})

	// CORS setup
	const origins = configService
		.get("CORS_ORIGINS", "http://localhost:3000")
		.split(",")
	app.enableCors({
		origin: origins,
		credentials: true
	})

	app.set("trust proxy", true)

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true
			}
		})
	)

	// Session storage setup
	app.use(
		session({
			store: new RedisSessionStore({
				host: configService.get("REDIS_SESSIONS_HOST", "127.0.0.1"),
				port: configService.get("REDIS_SESSIONS_PORT", 6379),
				client: RedisClient
			}),
			secret: configService.get("SESSION_SECRET", "change me pls"),
			cookie: {
				maxAge: 7 * 60 * 60 * 1000, // 7 days
				secure: true,
				httpOnly: true,
				sameSite: "none"
			},
			resave: false,
			saveUninitialized: false,
			rolling: true
		})
	)
	app.use(passport.initialize())
	app.use(passport.session())

	const ratelimitDuration = 900 // 15 minutes in seconds
	app.use(
		rateLimit({
			store: new redisRatelimitStore({
				host: configService.get("REDIS_SESSIONS_HOST", "127.0.0.1"),
				port: configService.get("REDIS_SESSIONS_PORT", 6379),
				client: RedisClient,
				expiry: ratelimitDuration // value in seconds
			}),
			windowMs: ratelimitDuration * 1000, // value in ms
			max: 1000 // limit each IP to 1000 requests per windowMs (1000req / 15m ~= 1.1req/sec)
		})
	)

	await app.listen(configService.get("API_PORT", 3000), "0.0.0.0")
	console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
