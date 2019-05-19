import { createGraphqlSchema } from "mongo-graphql-starter";
import * as projectSetup from "./projectSetup2";

import path from "path";

createGraphqlSchema(projectSetup, path.resolve("./test/testProject3"));
