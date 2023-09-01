import { z } from "zod";

export function errorResponse(error: unknown, genericMessage: string) {
  if (error instanceof z.ZodError) {
    return new Response("Invalid request data passed", { status: 422 });
  }

  return new Response(genericMessage, { status: 500 });
}
