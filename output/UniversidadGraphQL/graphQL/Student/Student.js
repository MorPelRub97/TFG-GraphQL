import Direction from "../Direction/Direction";
import Subject from "../Subject/Subject";

export default {
  table: "students",
  typeName: "Student",
  fields: {
    _id: "MongoId",
    name: "String",
    email: "String",
    age: "Int",
    failer: "Boolean",
    degree: "String",
    location: {
      __isObject: true,
      get type(){ return Direction; }
    },
    subjects: {
      __isObject: true,
      get type(){ return Subject; }
    }
  },
  relationships: {

  }
};