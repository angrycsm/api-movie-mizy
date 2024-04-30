import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { prisma } from "/home/runner/mm-backend/src/lib/prisma";
import { generateSlug } from "/home/runner/mm-backend/src/utils/generate-slug";

export async function createMovieInCategory(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/movie-category/:categoryId/movie",
		{
			schema: {
				body: z.object({
					name: z.string().min(3),
					details: z.string().nullable(),
					driveUrl: z.string().url(),
					imageUrl: z.string().url(),
					email: z.string().email(),
				}),
				params: z.object({
					categoryId: z.string().uuid(),
				}),
				response: {
					201: z.object({
						movieInCategory: z.object({
							id: z.string().uuid(),
							name: z.string().min(3),
							details: z.string().nullable(),
							driveUrl: z.string().url(),
							imageUrl: z.string().url(),
							slug: z.string(),
							userCreatedMovieInCategory: z.string().email(),
						}),
					}),
				},
			},
		},
		async (request: FastifyRequest, reply: FastifyReply) => {
			const { categoryId } = request.params;

			const { name, details, driveUrl, imageUrl, email } = request.body;

			const allowedEmails: Array<string> = ["biellofy@gmail.com"];

			const [
				checkingIfTheCategoryExists,
				emailCreatedMovieInCategory,
				checkingIfYouAlreadyHaveAMovie,
			] = await Promise.all([
				prisma.movieCategory.findUnique({
					where: {
						id: categoryId,
					},
				}),

				prisma.user.findUnique({
					where: {
						email,
					},
				}),

				prisma.movie.findUnique({
					where: {
						categoryId_name_driveUrl_imageUrl: {
							categoryId,
							name,
							driveUrl,
							imageUrl,
						},
					},
				}),
			]);

			if (checkingIfTheCategoryExists === null) {
				return reply.status(400).send({ message: "Category does not exist" });
			}

			if (!emailCreatedMovieInCategory || !emailCreatedMovieInCategory.email) {
				return reply.status(400).send({ message: "Email is required" });
			}

			if (!allowedEmails.includes(emailCreatedMovieInCategory.email)) {
				return reply.status(401).send({
					message: "This email is not valid for creating a movie in category",
				});
			}

			if (checkingIfYouAlreadyHaveAMovie !== null) {
				return reply.status(409).send({ message: "Movie already registered" });
			}

			if (!name || !details || !driveUrl || !imageUrl || !email) {
				return reply.status(422).send({
					message:
						"You need to fill in all the fields to create a movie in a category",
				});
			}

			const movieInCategory = await prisma.movie.create({
				select: {
					id: true,
					name: true,
					details: true,
					driveUrl: true,
					imageUrl: true,
					slug: true,
					emailCreatedMovieInCategory: true,
				},
				data: {
					name,
					details,
					driveUrl,
					imageUrl,
					slug: generateSlug(name),
					categoryId,
					emailCreatedMovieInCategory: email,
				},
			});

			return reply.status(201).send({
				movieInCategory: {
					id: movieInCategory.id,
					name: movieInCategory.name,
					details: movieInCategory.details,
					driveUrl: movieInCategory.driveUrl,
					imageUrl: movieInCategory.imageUrl,
					slug: movieInCategory.slug,
					userCreatedMovieInCategory: emailCreatedMovieInCategory.email,
				},
			});
		},
	);
}
