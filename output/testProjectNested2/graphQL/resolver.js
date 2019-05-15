import GraphQLJSON from 'graphql-type-json';

import Student, { Student as StudentRest } from './Student/resolver';
import Subject, { Subject as SubjectRest } from './Subject/resolver';

const { Query: StudentQuery, Mutation: StudentMutation } = Student;
const { Query: SubjectQuery, Mutation: SubjectMutation } = Subject;

export default {
  JSON: GraphQLJSON,
  Query: Object.assign(
    {},
    StudentQuery,
    SubjectQuery
  ),
  Mutation: Object.assign({},
    StudentMutation,
    SubjectMutation
  ),
  Student: {
    ...StudentRest
  },
  Subject: {
    ...SubjectRest
  }
};

