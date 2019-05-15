import { dataTypes } from "mongo-graphql-starter";
const {
	MongoIdType,
	MongoIdArrayType,
	StringType,
	StringArrayType,
	BoolType,
	IntType,
	IntArrayType,
	FloatType,
	FloatArrayType,
	arrayOf,
	ObjectOf,
} = dataTypes;

export const Student = {
	table: "students",
	fields: {
		_id: MongoIdType,
		name: StringType,
		email: StringType,
		age: IntType,
		relationshipField: StringArrayType
	}
};

export const Subject = {
	table: "subjects",
	fields: {
		_id: MongoIdType,
		name: StringType,
		credits: IntType,
		department: StringType
	}
};

