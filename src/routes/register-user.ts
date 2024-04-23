import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

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
					}),
				},
			},
		},
		async (request: FastifyRequest, reply: FastifyReply) => {
			const { email, name } = request.body;

			const user = await prisma.user.create({
				data: {
					email,
					name,
				},
			});

			return reply.status(201).send({ userId: user.id });
		}
	);
}
