import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { redis } from "bun";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
  basePath: "/api/v1/auth",
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema,
  }),
  secondaryStorage: {
    get: async (key) => await redis.get(key),
    set: async (key, value, ttl) =>
      await (ttl ? redis.set(key, value, "EX", ttl) : redis.set(key, value)),
    delete: async (key) => void (await redis.del(key)),
  },
  trustedOrigins: ["http://localhost:3000"],
  emailAndPassword: {
    enabled: true,
    password: {
      hash: (password: string) => Bun.password.hash(password),
      verify: ({ password, hash }) => Bun.password.verify(password, hash),
    },
  },
  user: {
    changeEmail: {
      enabled: true,
    },
  },
  advanced: {
    database: {
      generateId: () => Bun.randomUUIDv7(),
    },
  },
  plugins: [openAPI()],
  experimental: { joins: true },
});
