import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { prisma } from "/home/runner/mm-backend/src/lib/prisma";
import { generateToken } from "/home/runner/mm-backend/src/utils/generate-token-jwt";

export async function registerUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/signup",
    {
      schema: {
        body: z.object({
          email: z.string().email("This is not a valid email"),
          name: z.string().min(3),
        }),

        response: {
          201: z.object({
            userId: z.number(),
            token: z.string(),
          }),
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { email, name } = request.body;

      const checkingIfTheUserAlreadyExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (checkingIfTheUserAlreadyExists !== null) {
        return reply.status(409).send({ message: "User already registered" });
      }
      

      const user = await prisma.user.create({
        data: {
          email,
          name,
        },
      });

      const token = generateToken({ userId: user.id })

      return reply.status(201).send({ userId: user.id, token });
    },
  );
}
