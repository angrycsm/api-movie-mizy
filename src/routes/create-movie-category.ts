import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

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
						movieCategoryId: z.number(),
					}),
				},
			},
		},
		async (request: FastifyRequest, reply: FastifyReply) => {
			const { name, details, email } = request.body;

			const [emailUser, movieCategory] = await Promise.all([
				prisma.user.findUnique({
					where: {
						email,
					},
				}),
				prisma.movieCategory.create({
					data: {
						name,
						details,
					},
				}),
			]);

			if (!emailUser || !emailUser.email) {
				throw new Error("Email is required");
			}

			if (emailUser.email !== "biellofy@gmail.com") {
				return reply
					.status(401)
					.send({ error: "This email is not valid for creating a category" });
			}

			return reply.status(201).send({ movieCategoryId: movieCategory.id });
		}
	);
}
