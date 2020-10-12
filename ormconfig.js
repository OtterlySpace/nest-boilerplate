module.exports = {
	type: "postgres",
	host: "postgres-database",
	port: 5432,
	username: "boilerplate-postgres",
	password: "BadPassword",
	database: "boilerplateapi",
	entities: ["dist/**/*.entity.js"],
	migrations: ["dist/migrations/*.js"],
	cli: {
		migrationsDir: "src/migrations",
	},
}
