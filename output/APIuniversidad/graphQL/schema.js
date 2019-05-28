import { query as DepartmentQuery, mutation as DepartmentMutation, type as DepartmentType } from './Department/schema';
import { query as DirectionQuery, mutation as DirectionMutation, type as DirectionType } from './Direction/schema';
import { query as StudentQuery, mutation as StudentMutation, type as StudentType } from './Student/schema';
import { query as SubjectQuery, mutation as SubjectMutation, type as SubjectType } from './Subject/schema';
import { query as TeacherQuery, mutation as TeacherMutation, type as TeacherType } from './Teacher/schema';
    
export default `
  scalar JSON

  type DeletionResultInfo {
    success: Boolean,
    Meta: MutationResultInfo
  }

  type MutationResultInfo {
    transaction: Boolean,
    elapsedTime: Int
  }

  type QueryResultsMetadata {
    count: Int
  }

  input StringArrayUpdate {
    index: Int,
    value: String
  }

  input IntArrayUpdate {
    index: Int,
    value: Int
  }

  input FloatArrayUpdate {
    index: Int,
    value: Float
  }

  ${DepartmentType}

  ${DirectionType}

  ${StudentType}

  ${SubjectType}

  ${TeacherType}

  type Query {
    ${DepartmentQuery}

    ${DirectionQuery}

    ${StudentQuery}

    ${SubjectQuery}

    ${TeacherQuery}
  }

  type Mutation {
    ${DepartmentMutation}

    ${DirectionMutation}

    ${StudentMutation}

    ${SubjectMutation}

    ${TeacherMutation}
  }

`