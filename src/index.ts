import { Acend } from "acend";
import { cors } from "@acend/cors";
import { openapi } from "@acend/openapi";
import { scalar } from "@acend/scalar";
import { getBetterAuthOpenAPIConfig } from "@/lib/auth/openapi";

const betterAuthOpenAPIConfig = await getBetterAuthOpenAPIConfig();

const app = new Acend()
  .use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  )
  .use(
    openapi({
      endpoint: "/openapi",
      info: {
        title: "Acend Better Auth Drizzle Example",
        version: "1.0.0",
        description: "Example API with Acend, Better Auth & Drizzle",
      },
      components: betterAuthOpenAPIConfig.components,
      transform: betterAuthOpenAPIConfig.transform,
    }),
  )
  .use(scalar({ path: "/reference", specUrl: "/openapi" }))
  .listen(3005);
