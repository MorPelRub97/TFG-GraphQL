export const type = `
  
  type Student {
    _id: String
    name: String
    email: String
    age: Int
    relationshipField: [String]
  }

  type StudentQueryResults {
    Students: [Student]
    Meta: QueryResultsMetadata
  }

  type StudentSingleQueryResult {
    Student: Student
  }

  type StudentMutationResult {
    Student: Student
    success: Boolean
    Meta: MutationResultInfo
  }

  type StudentMutationResultMulti {
    Students: [Student]
    success: Boolean
    Meta: MutationResultInfo
  }

  type StudentBulkMutationResult {
    success: Boolean
    Meta: MutationResultInfo
  }

  input StudentInput {
    _id: String
    name: String
    email: String
    age: Int
    relationshipField: [String]
  }

  input StudentMutationInput {
    name: String
    email: String
    age: Int
    age_INC: Int
    age_DEC: Int
    relationshipField: [String]
    relationshipField_PUSH: String
    relationshipField_CONCAT: [String]
    relationshipField_UPDATE: StringArrayUpdate
    relationshipField_UPDATES: [StringArrayUpdate]
    relationshipField_PULL: [String]
    relationshipField_ADDTOSET: [String]
  }

  input StudentSort {
    _id: Int
    name: Int
    email: Int
    age: Int
    relationshipField: Int
  }

  input StudentFilters {
    _id: String
    _id_ne: String
    _id_in: [String]
    name_contains: String
    name_startsWith: String
    name_endsWith: String
    name_regex: String
    name: String
    name_ne: String
    name_in: [String]
    email_contains: String
    email_startsWith: String
    email_endsWith: String
    email_regex: String
    email: String
    email_ne: String
    email_in: [String]
    age_lt: Int
    age_lte: Int
    age_gt: Int
    age_gte: Int
    age: Int
    age_ne: Int
    age_in: [Int]
    relationshipField_count: Int
    relationshipField_textContains: String
    relationshipField_startsWith: String
    relationshipField_endsWith: String
    relationshipField_regex: String
    relationshipField: [String]
    relationshipField_in: [[String]]
    relationshipField_contains: String
    relationshipField_containsAny: [String]
    relationshipField_ne: [String]
    OR: [StudentFilters]
  }
  
`;
  
  
export const mutation = `

  createStudent (
    Student: StudentInput
  ): StudentMutationResult

  updateStudent (
    _id: String,
    Updates: StudentMutationInput
  ): StudentMutationResult

  updateStudents (
    _ids: [String],
    Updates: StudentMutationInput
  ): StudentMutationResultMulti

  updateStudentsBulk (
    Match: StudentFilters,
    Updates: StudentMutationInput
  ): StudentBulkMutationResult

  deleteStudent (
    _id: String
  ): DeletionResultInfo

`;


export const query = `

  allStudents (
    _id: String,
    _id_ne: String,
    _id_in: [String],
    name_contains: String,
    name_startsWith: String,
    name_endsWith: String,
    name_regex: String,
    name: String,
    name_ne: String,
    name_in: [String],
    email_contains: String,
    email_startsWith: String,
    email_endsWith: String,
    email_regex: String,
    email: String,
    email_ne: String,
    email_in: [String],
    age_lt: Int,
    age_lte: Int,
    age_gt: Int,
    age_gte: Int,
    age: Int,
    age_ne: Int,
    age_in: [Int],
    relationshipField_count: Int,
    relationshipField_textContains: String,
    relationshipField_startsWith: String,
    relationshipField_endsWith: String,
    relationshipField_regex: String,
    relationshipField: [String],
    relationshipField_in: [[String]],
    relationshipField_contains: String,
    relationshipField_containsAny: [String],
    relationshipField_ne: [String],
    OR: [StudentFilters],
    SORT: StudentSort,
    SORTS: [StudentSort],
    LIMIT: Int,
    SKIP: Int,
    PAGE: Int,
    PAGE_SIZE: Int
  ): StudentQueryResults

  getStudent (
    _id: String
  ): StudentSingleQueryResult

`;
  
