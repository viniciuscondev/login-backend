import {} from 'dotenv/config';

export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: process.env.DATABASE_PASSWORD,
  database: 'test',
  migrations: ['./src/migrations/**.ts', './src/migrations/**.js'],
  entities: ['./src/models/**.ts', './src/models/**.js'],
  cli: {
    migrationsDir: './src/migrations',
  },
};
