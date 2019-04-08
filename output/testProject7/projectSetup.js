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
	DateType,
	arrayOf,
	ObjectOf,
	formattedDate,
	JSONType,
	typeLiteral
} = dataTypes;

export const Student = {
	table: "students",
	fields: {
		_id: MongoIdType,
		name: StringType,
		email: StringType,
		age: StringType,
		@id: StringType
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

