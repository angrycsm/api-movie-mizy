import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { prisma } from "/home/runner/mm-backend/src/lib/prisma";

export async function getMoviesInCategory(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/movie-category/movies",
		{
			schema: {
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

			if (moviesInCategory.length === 0) {
				return reply.status(404).send({ message: "No movies found" });
			}

			return reply
				.status(200)
				.send({ moviesInCategory: formattedMoviesInCategory });
		},
	);
}
