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
		age: StringType,
		relationshipField: StringArrayType
	}
};

export const Course = {
	table: "courses",
	fields: {
		_id: MongoIdType,
		name: StringType,
		credit: StringType,
		department: StringType
	}
};

