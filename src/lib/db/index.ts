import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/lib/db/schema";

export const db = drizzle({
  connection: {
    connectionString: Bun.env.POSTGRESQL_URL!,
    ssl: false,
  },
  schema,
});
