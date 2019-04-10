import { createGraphqlSchema } from "mongo-graphql-starter";
//import * as projectSetup from "./projectSetupA";
//import * as projectSetup from "./output/testProject6/projectSetup.js";
import path from "path";
import * as fs from "file-system";
import * as rmlParser from './RML-Mapper2/index.js';
import * as converter from "./JSONtoArray.js";
const mkdirp = require('mkdirp');

mkdirp('/home/david/Escritorio/TFG-GraphQL/output/testProject9/rml', function(err) {});

let options={
};

let result = rmlParser.parseFile('./input/mapping1.ttl', './output/testProject9/rml/out.json',options).
catch((err) => {
    console.log(err);
});

/*El parseo del mapping ha ido bien*/
result.then(() => {
  var fileJSON = converter.convertJSONtoArray('./output/testProject9/rml/out.json');
  var texto = "import { dataTypes } from \"mongo-graphql-starter\";\n"
            + "const {\n"
            + "\tMongoIdType,\n"
            + "\tMongoIdArrayType,\n"
            + "\tStringType,\n"
            + "\tStringArrayType,\n"
            + "\tBoolType,\n"
            + "\tIntType,\n"
            + "\tIntArrayType,\n"
            + "\tFloatType,\n"
            + "\tFloatArrayType,\n"
            + "\tDateType,\n"
            + "\tarrayOf,\n"
            + "\tObjectOf,\n"
            + "\tformattedDate,\n"
            + "\tJSONType,\n"
            + "\ttypeLiteral\n"
            + "} = dataTypes;\n"
            + "\n";

  for (var k in fileJSON){
    texto += "export const " + fileJSON[k].nombreTabla + " = {\n"
           + "\ttable: \"" + fileJSON[k].nombreTabla.toLowerCase() + "s\",\n"
           + "\tfields: {\n"
           + "\t\t_id: MongoIdType,\n";
           var i;
           var tamAtributosArr = fileJSON[k].atributos.length;
           for(i = 0; i < tamAtributosArr; i++){
             if(i == tamAtributosArr - 1){//Ultima pos, no añadir coma
               texto += "\t\t" + fileJSON[k].atributos[i] + ": StringType\n";
             }
             else{
               texto += "\t\t" + fileJSON[k].atributos[i] + ": StringType,\n";

             }
           }
    texto += "\t}\n"
           + "};\n\n";
  }

  fs.writeFile('/home/david/Escritorio/TFG-GraphQL/output/testProject9/projectSetup.js', texto, function(err) {});

  /*El projectSetup se ha creado, llamamos a mongo-graphql-starter*/
  import('./output/testProject8/projectSetup.js').then((ProjectSetup) => {
       createGraphqlSchema(ProjectSetup, path.resolve("./output/testProject9")).then(() => {
         console.log('GraphQL resolvers generados con éxito');
       });
  });
});
