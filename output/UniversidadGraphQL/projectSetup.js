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

export const Department = {
	table: "departments",
	fields: {
		_id: MongoIdType,
		name: StringType,
		building: IntType
	}
};

export const Direction = {
	table: "directions",
	fields: {
		_id: MongoIdType,
		street: StringType,
		number: IntType
	}
};

export const Student = {
	table: "students",
	fields: {
		_id: MongoIdType,
		name: StringType,
		email: StringType,
		age: IntType,
		failer: BoolType,
		degree: StringType,
		get location() {
			return objectOf(Direction);
		},
		get subjects() {
			return arrayOf(Subject);
		},
		get subjects() {
			return objectOf(Subject);
		}
	}
};

export const Subject = {
	table: "subjects",
	fields: {
		_id: MongoIdType,
		name: StringType,
		credits: IntType,
		type: StringType,
		get department() {
			return arrayOf(Department);
		},
		get teacher() {
			return arrayOf(Teacher);
		},
		get department() {
			return objectOf(Department);
		},
		get teacher() {
			return objectOf(Teacher);
		}
	}
};

export const Teacher = {
	table: "teachers",
	fields: {
		_id: MongoIdType,
		name: StringType
	}
};

