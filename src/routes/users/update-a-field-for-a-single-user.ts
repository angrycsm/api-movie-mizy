import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { prisma } from "/home/runner/mm-backend/src/lib/prisma";
import { parseStringToNumber } from "/home/runner/mm-backend/src/utils/parse-string-to-number";
import { generateToken } from "/home/runner/mm-backend/src/utils/generate-token-jwt";
import {
  userUpdateSchema,
  UserZodSchema,
  UserPrisma,
} from "/home/runner/mm-backend/src/types/users-types/user-update-type";
import jwt from "jsonwebtoken";

export async function updateAFieldForASingleUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/user/:id",
    {
      schema: {
        body: userUpdateSchema.pick({ name: true, email: true }).optional(),
        params: userUpdateSchema.pick({ id: true }),
        response: {
          200: z.object({
            user: userUpdateSchema,
            token: z.string(),
          }),
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params;
      const { name, email } = request.body;
      const authHeader = request.headers["authorization"];

      const token = authHeader && authHeader.split("Bearer ")[1];

      if (!token) {
        return reply.status(401).send({ message: "Unauthorized" });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

      if (typeof decodedToken !== "object") {
        return reply
          .status(401)
          .send({ message: "Unauthorized: Invalid Token" });
      }

      const userIdFromToken = decodedToken.userId.toString();
      const idFromParams = id.toString();

      if (userIdFromToken !== idFromParams) {
        return reply
          .status(403)
          .send({ message: "Forbidden: You can only update your own profile" });
      }

      const findUser: UserPrisma | null = await prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (findUser === null) {
        return reply.status(404).send({ message: "User not found" });
      }

      if (
        request.body === null ||
        typeof request.body !== "object" ||
        Object.keys(request.body).length === 0
      ) {
        return reply
          .status(400)
          .send({ message: "Bad Request: Missing request body" });
      }

      const updatedUser: UserPrisma = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
          email,
        },
      });

      const newToken = generateToken({ userId: updatedUser.id });

      return reply.status(201).send({ user: updatedUser, token: newToken });
    },
  );
}
