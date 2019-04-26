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
		age: StringType,
		email: StringType,
		phone: StringType,
		credits: StringType,
		repetidor: StringType
	}
};

