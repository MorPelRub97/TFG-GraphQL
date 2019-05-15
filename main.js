import { createGraphqlSchema } from "mongo-graphql-starter";
import path from "path";
import * as fs from "file-system";
//import * as rmlParser from './RML-Mapper2/index.js';
//import * as rmlParser1 from './RML-Parser/index.js'
//import * as converter from "./JSONtoArray.js";
import * as transformer from "./transformer.js";
import mkdirp from "mkdirp";
import rocketrml from "rocketrml";

function generateOutput(mappingPath, testProjectFolder){

mkdirp('/home/david/Escritorio/TFG-GraphQL/output/' + testProjectFolder + '/rml', function(err) {});

let options={
};

/*Llamamos a Rocket para parsear el mapping*/
let result = rocketrml.parseFile(mappingPath, './output/' + testProjectFolder + '/rml/out.json',options).
catch((err) => {
    console.log(err);
});

/*El parseo del mapping ha ido bien*/
result.then(() => {
  var fileJSON = transformer.convertRDF('./output/' + testProjectFolder + '/rml/out.json');
  //var dataTypesObj = fileJSON[0].dataTypes;

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
            + "\tarrayOf,\n"
            + "\tObjectOf,\n"
            + "} = dataTypes;\n\n";

  for(var k in fileJSON){
    texto += "export const " + fileJSON[k].tabla + " = {\n"
           + "\ttable: \"" + fileJSON[k].tabla.toLowerCase() + "s\",\n"
           + "\tfields: {\n";
    var i;
    for(i = 0; i < fileJSON[k].atributos.length; i++){
      var arraySplit = [];
      if(i == fileJSON[k].atributos.length - 1){//Ultima pos, no añadir coma
        arraySplit = fileJSON[k].atributos[i].split("-");//0-->nombre campo 1-->dataType
        texto += "\t\t" + arraySplit[0] + ": " + arraySplit[1] + "\n";
      }
      else{
        arraySplit = fileJSON[k].atributos[i].split("-");//0-->nombre campo 1-->dataType
        texto += "\t\t" + arraySplit[0] + ": " + arraySplit[1] + ",\n";
      }
    }
    texto += "\t}\n"
           + "};\n\n";
  }

  fs.writeFile('/home/david/Escritorio/TFG-GraphQL/output/' + testProjectFolder + '/projectSetup.js', texto, function(err) {});

  /*El projectSetup se ha creado, llamamos a mongo-graphql-starter para crear los resolvers*/
  import('./output/' + testProjectFolder + '/projectSetup.js').then((ProjectSetup) => {
       createGraphqlSchema(ProjectSetup, path.resolve("./output/" + testProjectFolder)).then(() => {
         console.log('GraphQL resolvers generados con éxito');
       });
  });
});
}

//generateOutput('/home/david/Escritorio/mapping1.ttl', 'testProject11');
generateOutput('./input/mapping1.ttl', 'testProject4');

module.exports = { generateOutput };
