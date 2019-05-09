var fs = require('file-system');
var _ = require('lodash');

function isNumeric(num){
  return !isNaN(num);
}

function isInt(n) {
   return n % 1 === 0;
}

function convertJSONtoArray(input){

var jsonfile = fs.readFileSync(input,'utf8');

var objArr = JSON.parse(jsonfile);
var keyArr = [];
var valueArr = [];

/*Recorremos el JSON  y rellenamos keys y values*/
var i;
var tamObjArr = objArr.length;

for (i = 0; i < tamObjArr; i++) {
  keyArr.push(Object.keys(objArr[i]));
  valueArr.push(Object.values(objArr[i]));
};

/*Inicializamos nombre de las tablas (la tabla siempre es el primer elemento de los values, el @type)*/
var arrayTablas = [];

var arrTypesAux = valueArr;
var arrTypes = [];

for(var k in valueArr){
 arrayTablas.push(valueArr[k][0]);
 arrTypesAux[k].shift();
 arrTypesAux[k].pop();
 arrTypes.push(valueArr[k]);
}

/*Eliminamos el prefix y nos quedamos solo con el nombre de la tabla*/
var arrAux = [];

for (var k in arrayTablas){
  arrAux = arrayTablas[k].split("/");
  arrayTablas[k] = arrAux[arrAux.length-1];
}


/*Inicializamos nombre de los atributos (elementos de las key desde 1 hasta n-1)*/
var arrayAtributos = [];
var arrayTipoAtributos = [];

for (var k in keyArr){
  keyArr[k].shift();//eliminamos el primer elemento @type
  keyArr[k].pop();//eliminamos el último elemento @id
  arrayAtributos.push(keyArr[k]);
}

/*Eliminamos el prefix y nos quedamos solo con el nombre del atributo*/
for (var k in arrayAtributos){
  for (var j in arrayAtributos[k]){
  arrAux = arrayAtributos[k][j].split("/");
  arrayAtributos[k][j] = arrAux[arrAux.length-1];
 }
}

/*Inicializamos los dataTypes de los atributos*/
for(var k in arrTypes){
  for(var x in arrTypes[k]){
    if(isNumeric(arrTypes[k][x])){//Numero, aun no se sabe si float o int
      if(isInt(arrTypes[k][x])){
        arrTypes[k][x] = "IntType";
      }
      else{
        arrTypes[k][x] = "FloatType";
      }
    }
    else{//String, no se sabe si es string, boolean, date...
      if(arrTypes[k][x] == "true" || arrTypes[k][x] == "false"){
        arrTypes[k][x] = "BoolType";
      }
      else{
        arrTypes[k][x] = "StringType";
      }
    }
  }
}

var objTypes = {};

for (var i in arrayAtributos){
  for(var j in arrayAtributos[i]){
    objTypes[arrayAtributos[i][j]] = arrTypes[i][j];
  }
}

/*Ahora, el primer elemento de arrayTablas tiene los atributos del primer elemento de arrayAtributos */
var preResult = arrayTablas.map(function(v, i) {
  return {
    nombreTabla: v,
    atributos: arrayAtributos[i]
  };
});

var i;
var tamPreResult = preResult.length;

var resultNombreTablas = _.uniq(arrayTablas);//Eliminamos las entradas duplicadas en las tablas
var resultAtributos = [];

var iteraciones;
if(resultNombreTablas.length > 1){//Mappings con mas de una tabla
  iteraciones = 2;
}
else {//Mappings sencillos de una tabla
  iteraciones = 1;
}

for (i = 0; i < tamPreResult - iteraciones; i++) {
  if(preResult[i].nombreTabla == preResult[i+1].nombreTabla){
    resultAtributos.push(_.uniq(preResult[i].atributos.concat(preResult[i+1].atributos)));
  }
};

//Si hay varias tablas y hay nueva tabla en la última posicion (en el for no se mira), se añade
if(iteraciones = 2 && (preResult[tamPreResult -1].nombreTabla != preResult[tamPreResult -2].nombreTabla)){
  resultAtributos.push(preResult[i].atributos);
}

/*Resultado final*/
var result = resultNombreTablas.map(function(v, i) {
  return {
    nombreTabla: v,
    atributos: resultAtributos[i],
    dataTypes: objTypes
  };
});

console.log(result);
return result;
}

module.exports = { convertJSONtoArray };
