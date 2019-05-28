import Department from "../Department/Department";
import Teacher from "../Teacher/Teacher";

export default {
  table: "subjects",
  typeName: "Subject",
  fields: {
    _id: "MongoId",
    name: "String",
    credits: "Int",
    type: "String",
    department: {
      __isObject: true,
      get type(){ return Department; }
    },
    teacher: {
      __isObject: true,
      get type(){ return Teacher; }
    }
  },
  relationships: {

  }
};