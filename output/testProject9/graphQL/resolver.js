import GraphQLJSON from 'graphql-type-json';

import Course, { Course as CourseRest } from './Course/resolver';
import Student, { Student as StudentRest } from './Student/resolver';

const { Query: CourseQuery, Mutation: CourseMutation } = Course;
const { Query: StudentQuery, Mutation: StudentMutation } = Student;

export default {
  JSON: GraphQLJSON,
  Query: Object.assign(
    {},
    CourseQuery,
    StudentQuery
  ),
  Mutation: Object.assign({},
    CourseMutation,
    StudentMutation
  ),
  Course: {
    ...CourseRest
  },
  Student: {
    ...StudentRest
  }
};

