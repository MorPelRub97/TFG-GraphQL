import { MongoClient } from "mongodb";
import expressGraphql from "express-graphql";
import resolvers from "./graphQL/resolver.js";
import schema from "./graphQL/schema.js";
import { makeExecutableSchema } from "graphql-tools";
import express from "express";

const app = express();

const connString = "mongodb+srv://admin:admin1234@cluster0-ya4ra.mongodb.net/test?retryWrites=true";

const mongoClientPromise = MongoClient.connect(connString, { useNewUrlParser: true });
const mongoDbPromise = mongoClientPromise.then(client => client.db("mydb"));

const root = { client: mongoClientPromise, db: mongoDbPromise };
const executableSchema = makeExecutableSchema({ typeDefs: schema, resolvers });

app.use("/graphql", expressGraphql({
		schema: executableSchema,
		graphiql: true,
		rootValue: root
	})
);

app.listen(3000, () => console.log(`Servidor GraphQL ejecutando en http://localhost:3000/graphql`));