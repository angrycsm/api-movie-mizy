import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { prisma } from "/home/runner/mm-backend/src/lib/prisma";

export async function getUsers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/users",
    {
      schema: {
        response: {
          200: z.object({
            users: z.array(
              z.object({
                id: z.number(),
                email: z.string().email(),
                name: z.string().min(3),
              }),
            ),
          }),
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const users = await prisma.user.findMany();

      if (users.length === 0) {
        throw new Error("No users found");
      }

      return reply.status(200).send({ users });
    },
  );
}
