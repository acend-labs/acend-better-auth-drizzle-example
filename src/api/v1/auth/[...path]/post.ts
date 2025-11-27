import type { Handler } from "acend";
import { auth } from "@/lib/auth/auth";

const handler: Handler = (req) => auth.handler(req);

export default handler;
