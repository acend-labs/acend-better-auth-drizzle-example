# acend-better-auth-drizzle-example

This example project demonstrates how to integrate [Acend Backend Framework](https://github.com/acend-labs/acend) with [Better Auth](https://www.better-auth.com/) and [Drizzle](https://orm.drizzle.team/).

## Installation

Clone the project

```bash
git clone git@github.com:acend-labs/acend-better-auth-drizzle-example.git
```

Install the dependencies

```bash
bun install
```

Adapt `.env` based on example env file

```bash
mv .env.example .env
```

Run docker-compose. Adapt it to your needs beforehand

```bash
docker-compose up -d
```

Migrate the database
```bash
bun db:migrate
```

## Development

Start the development server:

```bash
bun run dev
```

- The API is availaible on [http://localhost:3005/api/v1](http://localhost:3005/api/v1)
- The OpenAPI specification is availaible on [http://localhost:3005/openapi](http://localhost:3005/openapi)
- The Scalar UI is availaible on [http://localhost:3005/reference](http://localhost:3005/reference)
