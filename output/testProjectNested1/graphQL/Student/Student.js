export default {
  table: "students",
  typeName: "Student",
  fields: {
    _id: "MongoId",
    name: "String",
    email: "String",
    age: "Int",
    relationshipField: "StringArray"
  },
  relationships: {

  }
};