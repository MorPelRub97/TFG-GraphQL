import { MongoClient } from "mongodb";
import expressGraphql from "express-graphql";
import resolvers from "./graphQL/resolver.js";
import schema from "./graphQL/schema.js";
import { makeExecutableSchema } from "graphql-tools";
import express from "express";

const app = express();

const connString = "mongodb://localhost:27017/";

const mongoClientPromise = MongoClient.connect(connString, { useNewUrlParser: true });
const mongoDbPromise = mongoClientPromise.then(client => client.db("Universidad"));

const root = { client: mongoClientPromise, db: mongoDbPromise };
const executableSchema = makeExecutableSchema({ typeDefs: schema, resolvers });

app.use("/graphql", expressGraphql({
		schema: executableSchema,
		graphiql: true,
		rootValue: root
	})
);

app.listen(3000, () => console.log(`Servidor GraphQL ejecutando en http://localhost:3000/graphql`));
