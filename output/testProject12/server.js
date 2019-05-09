import { MongoClient } from "mongodb";
import expressGraphql from "express-graphql";
import resolvers from "./output/testProject12/graphQL/resolver.js";
import schema from "./output/testProject12/graphQL/schema.js";
import { makeExecutableSchema } from "graphql-tools";
import express from "express";

const app = express();

const connString = "mongodb+srv://admin:admin1234@cluster0-ya4ra.mongodb.net/test?retryWrites=true";

