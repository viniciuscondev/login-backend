# Login backend
[![login backend](https://img.shields.io/badge/viniciuscondev-login--backend-blue)](https://github.com/viniciuscondev/login-backend)
[![license mit](https://img.shields.io/github/license/viniciuscondev/login-backend?color=blue)](https://github.com/viniciuscondev/login-backend/blob/main/LICENSE)

[NodeJS](https://github.com/nodejs/node) account creation, login and authentication system, using [Express](https://github.com/expressjs/express) framework, [JSON Web Token](https://github.com/auth0/node-jsonwebtoken) for authorization and [node.bcrypt.js](https://github.com/kelektiv/node.bcrypt.js) for encrypting password before storing in [PostgreSQL](https://github.com/postgres/postgres) database.

## How to run in development environment ##

Node and yarn versions used in the project
```
node -v
v14.17.5

yarn -v
1.22.10
```

1. Clone repository on your machine

```
git clone https://github.com/viniciuscondev/login-backend.git
```

2. Access the project directory

```
cd login-backend
```

3. Download project dependencies

```
yarn
```

4. Rename ".env.example" file as ".env" and fill in with your environment variables

```
DATABASE_PASSWORD = *your database password*

SECRET_KEY = *your jsonwebtoken secret*
```

5. Fill in "ormconfig.ts" file with your database credentials

```
export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: process.env.DATABASE_PASSWORD,
  database: 'example',
  migrations: ['./src/migrations/**.ts', './src/migrations/**.js'],
  entities: ['./src/models/**.ts', './src/models/**.js'],
  cli: {
    migrationsDir: './src/migrations',
  },
};
```

6. Run the project in development environment

```
yarn dev
```

## Libraries used in this project ##

* [typeorm](https://github.com/typeorm/typeorm)
* [express](https://github.com/expressjs/express)
* [bcryptjs](https://github.com/kelektiv/node.bcrypt.js)
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
* [dotenv](https://github.com/motdotla/dotenv)
* [uuid](https://github.com/uuidjs/uuid)
* [node-postgres](https://github.com/brianc/node-postgres)
* [ESLint](https://github.com/eslint/eslint)
