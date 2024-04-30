import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { prisma } from "/home/runner/mm-backend/src/lib/prisma";

export async function createMovieCategory(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/movie-category",
    {
      schema: {
        body: z.object({
          name: z.string().min(3),
          email: z.string().email(),
          details: z.string().nullable(),
        }),
        response: {
          201: z.object({
            movieCategory: z.object({
              id: z.string().uuid(),
              name: z.string().min(3),
              details: z.string().nullable(),
              userCreatedCategory: z.string().email(),
            }),
          }),
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { name, details, email } = request.body;

      const allowedEmails: string[] = ["biellofy@gmail.com"];

      const [emailCreatedCategory, checkingIfYouAlreadyHaveACategory] = await Promise.all([
        prisma.user.findUnique({
          where: {
            email,
          },
        }),
        prisma.movieCategory.findUnique({
          where: {
            name,
          },
        }),
      ]);

      if (!emailCreatedCategory || !emailCreatedCategory.email) {
        return reply.status(400).send({ message: "Email is required" });
      }

      if (!allowedEmails.includes(emailCreatedCategory.email)) {
        return reply
          .status(401)
          .send({ error: "This email is not valid for creating a category" });
      }

      if (!name || !details || !email) {
        return reply
          .status(401)
          .send("You need to fill in all the fields to create a category");
      }

      if (checkingIfYouAlreadyHaveACategory !== null) {
        return reply
          .status(409)
          .send({ message: "Category already registered" });
      }

      const movieCategory = await prisma.movieCategory.create({
        data: {
          name,
          details,
          emailCreatedCategory: email,
        },
      });

      return reply.status(201).send({
        movieCategory: {
          id: movieCategory.id,
          name: movieCategory.name,
          details: movieCategory.details,
          userCreatedCategory: emailCreatedCategory.email,
        },
      });
    },
  );
}