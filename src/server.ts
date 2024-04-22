import Fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { registerUser }from "./routes/register-user";

const app = Fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(registerUser)

app.listen({ port: 3333 }).then(() => {
	console.log("Servidor iniciado na porta 3333");
});