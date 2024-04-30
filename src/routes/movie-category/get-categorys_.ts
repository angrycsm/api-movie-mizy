import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { prisma } from "/home/runner/mm-backend/src/lib/prisma";

export async function getCategorys(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/movie-category/categorys",
		{
			schema: {
				response: {
					200: z.object({
						movieCategory: z.array(
							z.object({
								id: z.string(),
								name: z.string(),
								details: z.string(),
								emailCreatedCategory: z.string().email(),
								createdAt: z
									.string()
									.regex(
										/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
									),
							}),
						),
					}),
				},
			},
		},
		async (request: FastifyRequest, reply: FastifyReply) => {
			const movieCategories = await prisma.movieCategory.findMany();

			// Mapear os dados para o formato esperado pelo esquema Zod
			const formattedMovieCategories = movieCategories.map(
				(movieCategory) => ({
					id: movieCategory.id,
					name: movieCategory.name,
					details: movieCategory.details,
					emailCreatedCategory: movieCategory.emailCreatedCategory,
					createdAt: movieCategory.createdAt.toISOString(), // Convertendo para o formato de string esperado
				}),
			);

			if (movieCategories.length === 0) {
				return reply.status(404).send({ message: "Categorys not found" });
			}

			return reply
				.status(200)
				.send({ movieCategory: formattedMovieCategories });
		},
	);
}
