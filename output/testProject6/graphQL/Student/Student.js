import Direccion from "../Direccion/Direccion";
import Subject from "../Subject/Subject";

export default {
  table: "students",
  typeName: "Student",
  fields: {
    _id: "Int",
    name: "String",
    email: "String",
    age: "Int",
    location: {
      __isObject: true,
      get type(){ return Direccion; }
    },
    subjects: {
      __isObject: true,
      get type(){ return Subject; }
    }
  },
  relationships: {

  }
};