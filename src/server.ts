import Fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { registerUser }from "./routes/register-user";
import { createMovieCategory } from "./routes/create-movie-category"

const app = Fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(registerUser)
app.register(createMovieCategory)

app.listen({ port: 3333 }).then(() => {
	console.log("Servidor iniciado na porta 3333");
});