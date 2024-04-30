import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { prisma } from "/home/runner/mm-backend/src/lib/prisma";

export async function getMultipleMoviesFromASingleCategory(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/movie-category/:categoryId/movies",
		{
			schema: {
				params: z.object({
					categoryId: z.string().uuid(),
				}),
				
				response: {
					200: z.object({
						moviesInCategory: z.array(
							z.object({
								id: z.string().uuid(),
								name: z.string(),
								details: z.string(),
								driveUrl: z.string().url(),
								imageUrl: z.string().url(),
								createdAt: z.string(),
								slug: z.string(),
								categoryId: z.string().uuid(),
								emailCreatedMovieInCategory: z.string().email(),
							}),
						),
					}),
				},
			},
		},
		async (request: FastifyRequest, reply: FastifyReply) => {
			const { categoryId } = request.params 

			const checkingIfTheCategoryExists = prisma.movieCategory.findUnique({
				where: {
					id: categoryId
				}
			})
			
			const moviesInCategory = await prisma.movie.findMany();

			const formattedMoviesInCategory = moviesInCategory.map((movie) => ({
				id: movie.id,
				name: movie.name,
				details: movie.details,
				driveUrl: movie.driveUrl,
				imageUrl: movie.imageUrl,
				createdAt: movie.createdAt.toISOString(),
				slug: movie.slug,
				categoryId: movie.categoryId,
				emailCreatedMovieInCategory: movie.emailCreatedMovieInCategory,
			}));

			if (request.params === null) {
				return reply.status(400).send({ message: 'teste '})
			}

			if (checkingIfTheCategoryExists === null) {
				return reply.status(400).send({ message: "Category does not exist" });
			}

			if (moviesInCategory.length === 0) {
				return reply.status(404).send({ message: "No movies found" });
			}

			return reply
				.status(200)
				.send({ moviesInCategory: formattedMoviesInCategory });
		},
	);
}
