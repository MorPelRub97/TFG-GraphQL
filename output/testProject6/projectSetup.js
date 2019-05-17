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

export const Subject = {
	table: "subjects",
	fields: {
		_id: IntType,
		name: StringType,
		credits: IntType
	}
};

export const Student = {
	table: "students",
	fields: {
		_id: IntType,
		name: StringType,
		email: StringType,
		age: IntType,
		failer: BoolType,
		location: IntArrayType,
		subjects: IntArrayType
	},
	relationships: {
		location: {
			get type() {
				return Direction;
			},
			fkField: "location"
		},
		subjects: {
			get type() {
				return Subject;
			},
			fkField: "subjects"
		}
	}
};

export const Direction = {
	table: "directions",
	fields: {
		_id: IntType,
		street: StringType,
		number: IntType
	}
};

