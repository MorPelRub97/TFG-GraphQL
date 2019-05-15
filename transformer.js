var fs = require('file-system');
var _ = require('lodash');



function isNumeric(num){//Devuelve true si es numerico
  return !isNaN(num);
}

function isInt(n) {//Devuelve true si es float
  return n % 1 === 0;
}

function isEmpty(obj) {//Devuelve true si el objeto esta vacio
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function existePos(tabla, arrObj){
  var encontrado = false;
  var i;
  for(i = 0; i < arrObj.length && encontrado == false; i++){
    if(arrObj[i].tabla == tabla){
      encontrado = true;
      return i;
    }
  }
  return -1;
}

function convertRDF(input){

  //var file = fs.readFileSync('./output/testProject4/rml/out.json','utf8');
  var file = fs.readFileSync(input,'utf8');
  var jsonFile = JSON.parse(file);

  var arrayObject =  [];

  for (var k in jsonFile){
    var arrayKeys = Object.keys(jsonFile[k]);
    var arrayFieldType = [];
    var objectAux = {};
    var arrayFieldType = [];
    var pairFieldType;
    var aux1, aux2, aux3;
    var arrayAux1, arrayAux2;
    var typeAux;//typeAux ---> type del campo

    for (var j in arrayKeys){
      if(arrayKeys[j] == "@type"){
        arrayAux1 = jsonFile[k][arrayKeys[j]].split("/");
        aux1 = arrayAux1[arrayAux1.length-1];//aux1 ---> nombre de la tabla
      }
      else if(arrayKeys[j] == "@id"){
        //buscar el tipo de objeto relacionado
      }
      else{//campo normal
        arrayAux2 = arrayKeys[j].split("/");
        aux2 = arrayAux2[arrayAux2.length-1];//aux2 ---> nombre del campo
        aux3 = jsonFile[k][arrayKeys[j]];//aux3 ---> valor del campo
        if(isNumeric(aux3)){
          if(isInt(aux3)){
            typeAux = "IntType";
          }
          else{
            typeAux = "FloatType";
          }
        }
        else{
          if(aux3 == "true" || aux3 == "false"){
            typeAux = "BoolType";
          }
          else{
            typeAux = "StringType";
          }
        }
        pairFieldType = aux2 + "-" + typeAux;
        arrayFieldType.push(pairFieldType);
      }
    }
    objectAux.tabla = aux1;
    objectAux.atributos = arrayFieldType;
    arrayObject.push(objectAux);
  }

  var arrayObjectResult = [];//Valor a ser devuelto, no tiene tablas repetidas y tiene merge de los atributos

  for(var k in arrayObject){
    var pos;
    if(arrayObjectResult.length == 0){
      arrayObjectResult.push(arrayObject[k]);
    }
    else{
      pos = existePos(arrayObject[k].tabla, arrayObjectResult);
      if(pos == -1){
        arrayObjectResult.push(arrayObject[k]);
      }
      else{
        arrayObjectResult[pos].atributos = _.union(arrayObjectResult[pos].atributos, arrayObject[k].atributos);
      }
    }
  }
  console.log(arrayObjectResult);
  return arrayObjectResult;
}

//convertRDF('./output/testProject4/rml/out.json')

//console.log(jsonFile[0]["@id"]);
module.exports = { convertRDF };
