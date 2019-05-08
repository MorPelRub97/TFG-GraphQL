import { MongoClient } from "mongodb";
import expressGraphql from "express-graphql";
import resolvers from "./output/testProject10/graphQL/resolver.js";
import schema from "./output/testProject10/graphQL/schema.js";
import { makeExecutableSchema } from "graphql-tools";
import express from "express";

const app = express();//Se lanza la app

const connString = "mongodb+srv://admin:admin1234@cluster0-ya4ra.mongodb.net/test?retryWrites=true";

const mongoClientPromise = MongoClient.connect(connString, { useNewUrlParser: true });
const mongoDbPromise = mongoClientPromise.then(client => client.db("mydb"));//test es el nombre de la base de datos dentro del cluster

const root = { client: mongoClientPromise, db: mongoDbPromise };
const executableSchema = makeExecutableSchema({ typeDefs: schema, resolvers });

app.use("/graphql", expressGraphql({
    schema: executableSchema,
    graphiql: true,
    rootValue: root
  })
);

app.listen(3000, () => console.log(`Servidor GraphQL ejecutando en http://localhost:3000/graphql`));
