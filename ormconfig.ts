import {} from 'dotenv/config';

export default {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": process.env.DATABASE_PASSWORD,
    "database": "test",
    "migrations": ["./src/migrations/**.ts"],
    "entities": ["./src/models/**.ts"],
    "cli": {
        "migrationsDir": "./src/migrations"
    }
}