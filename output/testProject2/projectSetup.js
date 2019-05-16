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
		_id: IntType,
		name: StringType,
		email: StringType,
		age: IntType,
		location: StringType,
		subjects: StringType
	}
};

export const Direccion = {
	table: "direccions",
	fields: {
		_id: IntType,
		street: StringType
	}
};

export const Subject = {
	table: "subjects",
	fields: {
		_id: IntType,
		name: StringType,
		credits: IntType,
		department: StringType
	}
};

