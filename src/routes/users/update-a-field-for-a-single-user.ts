import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { prisma } from "/home/runner/mm-backend/src/lib/prisma";
import { parseStringToNumber } from "/home/runner/mm-backend/src/utils/parse-string-to-number";
import { generateToken } from "/home/runner/mm-backend/src/utils/generate-token-jwt";
import jwt from "jsonwebtoken";

export async function updateAFieldForASingleUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/user/:id",
    {
      schema: {
        body: z.object({
          name: z.string().optional(),
          email: z.string().email().optional(),
        }),
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            user: z.object({
              id: z.string(),
              email: z.string().email(),
              name: z.string(),
              createdAt: z.number(),
            }),
            token: z.string(),
          }),
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params;
      const { name, email } = request.body;
      const authHeader = request.headers["authorization"];

      parseStringToNumber(id)

      console.log(request.params)
      console.log(request.headers)
      
      const token = authHeader && authHeader.split("Bearer ")[1];

      if (!token) {
        return reply.status(401).send({ message: "Unauthorized" });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      const userIdFromToken = decodedToken.userId.toString()
      const idFromParams = id.toString()

      if (userIdFromToken !== idFromParams) {
        return reply
          .status(403)
          .send({ message: "Forbidden: You can only update your own profile" });
      }

      console.log(decodedToken)

      const findUser = await prisma.user.findUnique({
        where: {
          id: parseStringToNumber(id),
        },
      });

      if (findUser === null) {
        return reply.status(404).send({ message: "User not found" });
      }

      if (request.body === null || Object.keys(request.body).length === 0) {
        return reply
          .status(400)
          .send({ message: "Bad Request: Missing request body" });
      }

      const user = await prisma.user.update({
        where: {
          id: parseStringToNumber(id),
        },
        data: {
          name,
          email,
        },
      });

      const newToken = generateToken({ userId: user.id });

      return reply.status(201).send({ user, token: newToken });
    },
  );
}
