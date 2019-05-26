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
	objectOf,
} = dataTypes;

export const Student = {
	table: "students",
	fields: {
		_id: StringType,
		name: StringType,
		email: StringType,
		age: IntType,
		failer: BoolType
	}
};

export const Subject = {
	table: "subjects",
	fields: {
		_id: StringType,
		name: StringType
	}
};

