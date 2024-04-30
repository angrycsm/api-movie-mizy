import Fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	ZodTypeProvider
} from "fastify-type-provider-zod";
import { registerUser } from "./routes/users/register-user";
import { createMovieCategory } from "./routes/movie-category/create-movie-category";
import { createMovieInCategory } from "./routes/movie-in-a-category/create-a-movie-in-the-category";
import { getUsers } from './routes/users/get-users';
import { getCategorys } from './routes/movie-category/get-categorys';
import { getMoviesInCategory } from "./routes/movie-in-a-category/get-movies-in-category";
import { getMultipleMoviesFromASingleCategory } from "./routes/movie-in-a-category/get-multiple-movies-from-a-single-category"

const app = Fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(registerUser);
app.register(createMovieCategory);
app.register(createMovieInCategory);

app.register(getCategorys);
app.register(getUsers);
app.register(getMoviesInCategory);
app.register(getMultipleMoviesFromASingleCategory)

app.listen({ port: 3333 }).then(() => {
	console.log("Servidor iniciado na porta 3333");
});
