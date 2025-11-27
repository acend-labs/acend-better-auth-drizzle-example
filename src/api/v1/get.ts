import type { Handler } from "acend";
import { ok } from "acend";

const handler: Handler = async (req) => {
  return ok({ message: "test message" });
};

export default handler;
