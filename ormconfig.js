module.exports = {
	type: "postgres",
	host: "postgres-annotator-database",
	port: 5432,
	username: "annotator-postgres",
	password: "BadPassword",
	database: "annotator",
	entities: ["dist/**/*.entity.js"],
	migrations: ["dist/migrations/*.js"],
	cli: {
		migrationsDir: "src/migrations",
	},
}
