import Direction from "../Direction/Direction";
import Complexity from "../Complexity/Complexity";
import Subject from "../Subject/Subject";

export default {
  table: "students",
  typeName: "Student",
  fields: {
    _id: "Int",
    name: "String",
    email: "String",
    age: "Int",
    failer: "Boolean",
    location: {
      __isObject: true,
      get type(){ return Direction; }
    },
    complexion: {
      __isObject: true,
      get type(){ return Complexity; }
    },
    subjects: {
      __isArray: true,
      get type(){ return Subject; }
    }
  },
  relationships: {

  }
};