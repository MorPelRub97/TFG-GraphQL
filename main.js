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
            + "\tobjectOf,\n"
            + "} = dataTypes;\n\n";

  var j;
  for(j = fileJSON.length-1; j >= 0; j--){
    texto += "export const " + fileJSON[j].tabla + " = {\n"
           + "\ttable: \"" + fileJSON[j].tabla.toLowerCase() + "s\",\n"
           + "\tfields: {\n";
    var i;
    for(i = 0; i < fileJSON[j].atributos.length; i++){
      var arraySplit = [];
      if(i == fileJSON[j].atributos.length - 1){//Ultima pos, no añadir coma
        arraySplit = fileJSON[j].atributos[i].split("-");//0-->nombre campo 1-->dataType
        texto += "\t\t" + arraySplit[0] + ": " + arraySplit[1] + "\n";
      }
      else{
        arraySplit = fileJSON[j].atributos[i].split("-");//0-->nombre campo 1-->dataType
        texto += "\t\t" + arraySplit[0] + ": " + arraySplit[1] + ",\n";
      }
    }
    if(fileJSON[j].relaciones.length == 0){//Si la tabla no tiene relaciones
      texto += "\t}\n"
             + "};\n\n";
    }
    else{
      texto += "\t},\n"
            + "\trelationships: {\n";
      var k;
      for(k=0; k < fileJSON[j].relaciones.length; k++){
        if(k == fileJSON[j].relaciones.length-1){//ultima pos, terminar
        arraySplit = fileJSON[j].relaciones[k].split("-");//0-> nombre del campo de la relacion 1-> objeto con el que se relaciona 2->tipo de relacion
        texto += "\t\t" + arraySplit[0] + ": {\n"
              + "\t\t\tget type() {\n"
              + "\t\t\t\treturn " + arraySplit[1] + ";\n"
              + "\t\t\t},\n"
              + "\t\t\tfkField: \"" + arraySplit[0] + "\"\n"
              + "\t\t}\n"
              + "\t}\n"
              + "};\n\n";
        }
        else{
          arraySplit = fileJSON[j].relaciones[k].split("-");//0-> nombre del campo de la relacion 1-> objeto con el que se relaciona 2->tipo de relacion
          texto += "\t\t" + arraySplit[0] + ": {\n"
                + "\t\t\tget type() {\n"
                + "\t\t\t\treturn " + arraySplit[1] + ";\n"
                + "\t\t\t},\n"
                + "\t\t\tfkField: \"" + arraySplit[0] + "\"\n"
                + "\t\t},\n";
        }
      }
    }
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
generateOutput('./input/mapping1.ttl', 'testProject6');

module.exports = { generateOutput };
