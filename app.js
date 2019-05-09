import express from "express";
import bodyParser from "body-parser";
import url from "url";
import JSZip from "jszip";
import zipper from "zip-local";
import archiver from "archiver";
import { createGraphqlSchema } from "mongo-graphql-starter";
import path from "path";
import * as fs from "file-system";
import * as rmlParser from "./RML-Mapper2/index.js";
import * as converter from "./JSONtoArray.js";
import mkdirp from "mkdirp";

const app = express();//Se lanza la app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'pug');
app.use(express.static('views'));

app.get('/', function (req, res){
  res.render('home.pug', {message: 'TFG-GraphQL:    Bases de datos MongoDB representadas en mappings RML a GraphQL resolvers'})
});

app.get('/transform', function (req, res){
  res.render('transform', {message: 'TFG-GraphQL:    Bases de datos MongoDB representadas en mappings RML a GraphQL resolvers'})
});

app.post('/transform', function (req, res) {
	if (!req.body) { return res.sendStatus(400) }

  if(req.body.db_url && req.body.db_name && req.body.mapping_path && req.body.output_folder && req.body.port_no){

      generateOutput(req.body.mapping_path, req.body.output_folder);
      generateServer(req.body.db_url, req.body.db_name, req.body.port_no, req.body.output_folder);
			res.redirect('/');

		} else {
      res.json({ "error": "todos los parámetros son necesarios" });
  }
});

function deleteFolder(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};


function generateOutput(mappingPath, testProjectFolder){

	deleteFolder('./output/' + testProjectFolder);

	mkdirp('./output/' + testProjectFolder + '/rml', function(err) {});
	let options={
	};

	/*Llamamos a Rocket para parsear el mapping*/
	let result = rmlParser.parseFile(mappingPath, './output/' + testProjectFolder + '/rml/out.json',options).
	catch((err) => {
  	console.log(err);
	});
	/*El parseo del mapping ha ido bien*/
	result.then(() => {
		var fileJSON = converter.convertJSONtoArray('./output/' + testProjectFolder + '/rml/out.json');
		var dataTypesObj = fileJSON[0].dataTypes;

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
             if(fileJSON[k].atributos[i] == "@id"){
               fileJSON[k].atributos[i] = "relationshipField"
               texto += "\t\t" + fileJSON[k].atributos[i] + ": StringArrayType\n";
             }
             else{
               for (var property in dataTypesObj) {
                 if (dataTypesObj.hasOwnProperty(property)) {
                   if(property == fileJSON[k].atributos[i]){
                     texto += "\t\t" + fileJSON[k].atributos[i] + ": " + dataTypesObj[property] + "\n";
                   }
                 }
               }
             }
           }
           else{
             for (var property in dataTypesObj) {
               if (dataTypesObj.hasOwnProperty(property)) {
                 if(property == fileJSON[k].atributos[i]){
                   texto += "\t\t" + fileJSON[k].atributos[i] + ": " + dataTypesObj[property] + ",\n";
                 }
               }
             }
           }
         }
  		 texto += "\t}\n"
         		 + "};\n\n";
			 }

	fs.writeFile('./output/' + testProjectFolder + '/projectSetup.js', texto, function(err) {});
	/*El projectSetup se ha creado, llamamos a mongo-graphql-starter para crear los resolvers*/
	import('./output/' + testProjectFolder + '/projectSetup.js').then((ProjectSetup) => {
     createGraphqlSchema(ProjectSetup, path.resolve("./output/" + testProjectFolder)).then(() => {
       console.log('GraphQL resolvers para ' + testProjectFolder + ' generados con éxito');
     });
	 });
	});
}


function generateServer(dbUrl, dbName, portNumber, testProjectFolder){
  var texto = "import { MongoClient } from \"mongodb\";\n"
            + "import expressGraphql from \"express-graphql\";\n"
            + "import resolvers from \"./graphQL/resolver.js\";\n"
            + "import schema from \"./graphQL/schema.js\";\n"
            + "import { makeExecutableSchema } from \"graphql-tools\";\n"
            + "import express from \"express\";\n\n"
            + "const app = express();\n\n"
            + "const connString = \"" + dbUrl + "\";\n\n"
            + "const mongoClientPromise = MongoClient.connect(connString, { useNewUrlParser: true });\n"
            + "const mongoDbPromise = mongoClientPromise.then(client => client.db(\"" + dbName + "\"));\n\n"
            + "const root = { client: mongoClientPromise, db: mongoDbPromise };\n"
            + "const executableSchema = makeExecutableSchema({ typeDefs: schema, resolvers });\n\n"
            + "app.use(\"/graphql\", expressGraphql({\n"
            + "\t\tschema: executableSchema,\n"
            + "\t\tgraphiql: true,\n"
            + "\t\trootValue: root\n"
            + "\t})\n"
            + ");\n\n"
            + "app.listen(" + portNumber + ", () => console.log(`Servidor GraphQL ejecutando en http://localhost:" + portNumber + "/graphql`));";

  fs.writeFile('./output/' + testProjectFolder + '/server.js', texto, function(err) {});
}

app.listen(8080, () => console.log(`Servidor ejecutando en el puerto 8080`));
